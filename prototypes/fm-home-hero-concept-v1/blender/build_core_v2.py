"""
Reconstrução fiel do FM Core (V7) — referência obrigatória: hero-core.webp.

NÃO é uma evolução do modelo anterior (build_core.py / V5) — esse modelo
foi descartado por ficar simples demais (cérebro-esfera, carcaça-escudo,
anéis-torus lisos). Este script reconstrói do zero, mais denso.

Roda headless: blender --background --python build_core_v2.py
Gera fm-core-v2.glb (não sobrescreve o fm-core.glb da V5/V6, que segue
disponível no histórico do git).
"""

import bpy
import bmesh
import math
import random
from mathutils import Matrix

random.seed(11)

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for block in list(bpy.data.meshes) + list(bpy.data.materials) + list(bpy.data.textures):
    if block.users == 0:
        bpy.data.batch_remove([block])


def new_material(name, base_color, metallic=0.0, roughness=0.5,
                  transmission=0.0, emission_color=None, emission_strength=0.0,
                  ior=1.45, clearcoat=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*base_color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if "Transmission Weight" in bsdf.inputs:
        bsdf.inputs["Transmission Weight"].default_value = transmission
    elif "Transmission" in bsdf.inputs:
        bsdf.inputs["Transmission"].default_value = transmission
    if "IOR" in bsdf.inputs:
        bsdf.inputs["IOR"].default_value = ior
    if "Coat Weight" in bsdf.inputs:
        bsdf.inputs["Coat Weight"].default_value = clearcoat
    elif "Clearcoat" in bsdf.inputs:
        bsdf.inputs["Clearcoat"].default_value = clearcoat
    if emission_color:
        bsdf.inputs["Emission Color"].default_value = (*emission_color, 1.0)
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    if transmission > 0:
        mat.blend_method = 'BLEND'
    return mat


MAT_METAL_LIGHT = new_material("metal_light", (0.68, 0.73, 0.79), metallic=0.95, roughness=0.24, clearcoat=0.3)
MAT_METAL_MID = new_material("metal_mid", (0.42, 0.47, 0.53), metallic=0.92, roughness=0.34)
MAT_METAL_DARK = new_material("metal_dark", (0.045, 0.07, 0.1), metallic=0.55, roughness=0.5)
MAT_GLASS = new_material("glass", (0.08, 0.26, 0.48), metallic=0.0, roughness=0.05,
                          transmission=0.92, ior=1.42, clearcoat=1.0)
MAT_GLASS_EDGE = new_material("glass_edge", (0.2, 0.55, 0.9), metallic=0.1, roughness=0.15,
                               emission_color=(0.3, 0.7, 1.0), emission_strength=0.5)
MAT_RING_METAL = new_material("ring_metal", (0.75, 0.8, 0.86), metallic=0.92, roughness=0.22, clearcoat=0.4)
MAT_RING_GLASS = new_material("ring_glass", (0.15, 0.45, 0.8), metallic=0.1, roughness=0.1,
                               transmission=0.6, emission_color=(0.35, 0.75, 1.0), emission_strength=0.35)
MAT_BRAIN = new_material("brain", (0.12, 0.4, 0.68), metallic=0.0, roughness=0.4,
                          emission_color=(0.42, 0.78, 1.0), emission_strength=1.1)
MAT_BRAIN_CORE = new_material("brain_core", (0.5, 0.85, 1.0), metallic=0.0, roughness=0.2,
                               emission_color=(0.6, 0.9, 1.0), emission_strength=2.0)
MAT_NODE = new_material("node", (1.0, 1.0, 1.0), metallic=0.0, roughness=0.2,
                         emission_color=(0.8, 0.94, 1.0), emission_strength=2.6)
MAT_BEAM = new_material("beam", (1.0, 1.0, 1.0), metallic=0.0, roughness=0.3,
                         emission_color=(0.65, 0.9, 1.0), emission_strength=1.8)
MAT_EMBLEM = new_material("emblem", (1.0, 1.0, 1.0), metallic=0.0, roughness=0.2,
                           emission_color=(0.85, 0.95, 1.0), emission_strength=2.6)


def apply_modifiers(obj, mod_names=None):
    bpy.context.view_layer.objects.active = obj
    names = mod_names or [m.name for m in obj.modifiers]
    for n in names:
        try:
            bpy.ops.object.modifier_apply(modifier=n)
        except RuntimeError:
            pass


def apply_bevel(obj, width=0.02, segments=3, limit_angle=math.radians(35)):
    mod = obj.modifiers.new("bevel", type='BEVEL')
    mod.width = width
    mod.segments = segments
    mod.limit_method = 'ANGLE'
    mod.angle_limit = limit_angle
    apply_modifiers(obj, [mod.name])


def shade_smooth(obj, angle_deg=35):
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.ops.object.shade_smooth()
    try:
        obj.data.use_auto_smooth = True
        obj.data.auto_smooth_angle = math.radians(angle_deg)
    except AttributeError:
        pass


def octagon_disc(radius, depth, location, mat, bevel=0.0, name="disc"):
    bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=radius, depth=depth, location=(0, 0, 0))
    obj = bpy.context.active_object
    obj.name = name
    obj.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    obj.location = location
    if bevel > 0:
        apply_bevel(obj, width=bevel, segments=2)
    obj.data.materials.append(mat)
    return obj


# ==================================================================
# 1. CARCAÇA — corpo octogonal + MÚLTIPLAS molduras concêntricas
#    sobrepostas (não um recesso único) para dar a leitura "multicamada"
#    do V3.
# ==================================================================

bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=1.2, depth=1.34, location=(0, 0, 0))
chassis = bpy.context.active_object
chassis.name = "Chassis"
chassis.rotation_euler = (math.radians(90), 0, 0)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)

bpy.context.view_layer.objects.active = chassis
bm = bmesh.new()
bm.from_mesh(chassis.data)
bm.faces.ensure_lookup_table()
front_face = min(bm.faces, key=lambda f: f.calc_center_median().y)
inset1 = bmesh.ops.inset_region(bm, faces=[front_face], thickness=0.07, depth=0.0)
f1 = inset1['faces'][0]
bmesh.ops.translate(bm, verts=f1.verts, vec=(0, 0.05, 0))
inset2 = bmesh.ops.inset_region(bm, faces=[f1], thickness=0.07, depth=0.0)
f2 = inset2['faces'][0]
bmesh.ops.translate(bm, verts=f2.verts, vec=(0, 0.06, 0))
inset3 = bmesh.ops.inset_region(bm, faces=[f2], thickness=0.06, depth=0.0)
f3 = inset3['faces'][0]
bmesh.ops.translate(bm, verts=f3.verts, vec=(0, 0.05, 0))
bm.to_mesh(chassis.data)
bm.free()
chassis.data.update()

apply_bevel(chassis, width=0.03, segments=3)
shade_smooth(chassis)
chassis.data.materials.append(MAT_METAL_LIGHT)

# Camadas empilhadas na FRENTE da face do chassi (Y <= -0.685, mais
# perto da câmera que o topo do octógono em -0.67), como um "crachá"
# em degraus — em vez de tentar encaixar exatamente dentro do recesso
# interno (frágil, já deixou peças embutidas/invisíveis numa passada
# anterior). Regra: quanto MENOR o raio, mais perto da câmera (Y mais
# negativo) — senão o disco maior da frente cobre tudo atrás dele.
octagon_disc(1.0, 0.03, (0, -0.685, 0), MAT_METAL_MID, bevel=0.008, name="MidFrame")
octagon_disc(0.88, 0.03, (0, -0.70, 0), MAT_METAL_DARK, bevel=0.006, name="DarkFrame")
glass = octagon_disc(0.78, 0.05, (0, -0.715, 0), MAT_GLASS, bevel=0.006, name="GlassPanel")
octagon_disc(0.8, 0.01, (0, -0.712, 0), MAT_GLASS_EDGE, name="GlassEdgeGlow")

# ==================================================================
# 2. PEÇAS LATERAIS / MECÂNICAS — mais densas: 2 blocos grandes +
#    4 pequenos "conectores" ao redor do octógono (greebles)
# ==================================================================

for side in (-1, 1):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(side * 1.34, 0, -0.05))
    strut = bpy.context.active_object
    strut.name = f"Strut_{side}"
    strut.scale = (0.15, 0.95, 0.55)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    apply_bevel(strut, width=0.03, segments=2)
    shade_smooth(strut)
    strut.data.materials.append(MAT_METAL_DARK)

# pequenos blocos mecânicos na borda frontal do octógono (6, em círculo)
for i in range(6):
    angle = math.radians(i * 60 + 30)
    gx = math.cos(angle) * 1.0
    gz = math.sin(angle) * 1.0
    bpy.ops.mesh.primitive_cube_add(size=1, location=(gx, -0.69, gz))
    g = bpy.context.active_object
    g.name = f"Greeble_{i}"
    g.scale = (0.05, 0.07, 0.1)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    apply_bevel(g, width=0.01, segments=2)
    g.data.materials.append(MAT_METAL_MID)

# ==================================================================
# 3. EMBLEMA FM — texto 3D real, sobre o vidro
# ==================================================================

def add_text(body, size, y_pos, z_pos, extrude=0.014):
    bpy.ops.object.text_add(location=(0, y_pos, z_pos))
    txt = bpy.context.active_object
    txt.data.body = body
    txt.data.size = size
    txt.data.extrude = extrude
    txt.data.align_x = 'CENTER'
    txt.data.align_y = 'CENTER'
    txt.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.convert(target='MESH')
    txt.data.materials.append(MAT_EMBLEM)
    return txt


emblem_fm = add_text("FM", 0.3, -0.72, 0.1)
emblem_fm.name = "Emblem_FM"
emblem_sub = add_text("FM TECNOLOGIA", 0.065, -0.718, -0.16, extrude=0.008)
emblem_sub.name = "Emblem_Sub"

# ==================================================================
# 4. EIXO ENERGÉTICO — coluna vertical com discos empilhados (não um
#    cilindro liso), atravessando o Core até o cérebro
# ==================================================================

bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.045, depth=1.55, location=(0, 0, 1.05))
beam = bpy.context.active_object
beam.name = "EnergyBeam"
beam.data.materials.append(MAT_BEAM)

for i in range(7):
    z = 0.45 + i * 0.2
    r = 0.05 + 0.012 * math.sin(i * 1.7)
    bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=0.006, major_segments=16,
                                      minor_segments=6, location=(0, 0, z))
    disc = bpy.context.active_object
    disc.name = f"BeamDisc_{i}"
    disc.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    disc.data.materials.append(MAT_GLASS_EDGE)

# ==================================================================
# 5. ANÉIS ORBITAIS SEGMENTADOS — não um torus liso: cada anel é
#    composto por 10-14 segmentos de arco com gaps, alternando metal
#    e vidro/energizado, mais 2-3 "encaixes" (pequenos blocos) por anel.
# ==================================================================

def build_arc_segment(major_r, minor_r, start_deg, arc_deg, minor_seg=10, steps=20):
    """Varre (spin) um pequeno círculo de perfil ao redor do eixo Z por um
    arco parcial — gera um "pedaço de anel" robusto, sem boolean."""
    bm = bmesh.new()
    profile = []
    for k in range(minor_seg):
        theta = 2 * math.pi * k / minor_seg
        px = major_r + minor_r * math.cos(theta)
        pz = minor_r * math.sin(theta)
        profile.append(bm.verts.new((px, 0.0, pz)))
    bm.verts.ensure_lookup_table()
    edges = [bm.edges.new((profile[k], profile[(k + 1) % minor_seg])) for k in range(minor_seg)]

    bmesh.ops.rotate(bm, verts=profile, cent=(0, 0, 0),
                      matrix=Matrix.Rotation(math.radians(start_deg), 3, 'Z'))
    bmesh.ops.spin(bm, geom=profile + edges, axis=(0, 0, 1), angle=math.radians(arc_deg),
                    steps=steps, cent=(0, 0, 0), use_duplicate=False)

    mesh = bpy.data.meshes.new("arc")
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new("arc_obj", mesh)
    bpy.context.collection.objects.link(obj)
    return obj


def build_segmented_ring(name, major_r, minor_r, tilt, n_segments, gap_deg,
                          mat_a, mat_b, minor_seg=10):
    """Constrói um anel com N arcos, alternando materiais, com pequenos
    vãos entre eles — lê como estrutura orbital, não tubo liso."""
    group = []
    seg_span = 360.0 / n_segments
    arc_deg = seg_span - gap_deg
    for i in range(n_segments):
        start = i * seg_span
        arc = build_arc_segment(major_r, minor_r, start, arc_deg, minor_seg=minor_seg)
        arc.name = f"{name}_seg{i}"
        shade_smooth(arc, angle_deg=40)
        arc.data.materials.append(mat_a if i % 2 == 0 else mat_b)
        group.append(arc)

    # aplica tilt em tudo, via um empty temporário
    empty = bpy.data.objects.new(f"{name}_pivot", None)
    bpy.context.collection.objects.link(empty)
    for obj in group:
        obj.parent = empty
    empty.rotation_euler = (math.radians(tilt[0]), math.radians(tilt[1]), math.radians(tilt[2]))
    return empty, group


ring_specs = [
    dict(name="Ring0", major=1.6, minor=0.06, tilt=(75, 17, 0), n=12, gap=10,
         mat_a=MAT_RING_METAL, mat_b=MAT_METAL_MID),
    dict(name="Ring1", major=1.92, minor=0.03, tilt=(68, -22, 12), n=16, gap=8,
         mat_a=MAT_RING_GLASS, mat_b=MAT_RING_METAL),
    dict(name="Ring2", major=1.4, minor=0.045, tilt=(96, 9, -14), n=10, gap=12,
         mat_a=MAT_RING_METAL, mat_b=MAT_METAL_DARK),
    dict(name="Ring3", major=2.15, minor=0.024, tilt=(102, -14, 30), n=14, gap=9,
         mat_a=MAT_RING_GLASS, mat_b=MAT_RING_METAL),
]

ring_pivots = []
for spec in ring_specs:
    pivot, _ = build_segmented_ring(
        spec["name"], spec["major"], spec["minor"], spec["tilt"],
        spec["n"], spec["gap"], spec["mat_a"], spec["mat_b"],
    )
    ring_pivots.append(pivot)

# ==================================================================
# 6. CÉREBRO — DOIS HEMISFÉRIOS reais, sulcos/giros, não esfera
# ==================================================================

brain_parts = []
for side in (-1, 1):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=4, radius=0.5, location=(side * 0.19, 0, 1.65))
    hemi = bpy.context.active_object
    hemi.name = f"Hemi_{side}"
    # achata a face interna (voltada pro centro) para os hemisférios se
    # encontrarem numa linha reta, não se atravessarem em esfera cheia
    hemi.scale = (0.62, 0.82, 0.82)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    brain_parts.append(hemi)

# textura fractal (musgrave) = ranhuras tipo giros/sulcos; cloud = bojos largos
musgrave = bpy.data.textures.new("brain_musgrave", type='MUSGRAVE')
musgrave.musgrave_type = 'RIDGED_MULTIFRACTAL'
musgrave.noise_scale = 0.5
musgrave.nabla = 0.02

clouds = bpy.data.textures.new("brain_clouds", type='CLOUDS')
clouds.noise_scale = 0.9

for hemi in brain_parts:
    d1 = hemi.modifiers.new("gyri", type='DISPLACE')
    d1.texture = musgrave
    d1.strength = 0.055
    d1.mid_level = 0.5
    d2 = hemi.modifiers.new("bulge", type='DISPLACE')
    d2.texture = clouds
    d2.strength = 0.05
    apply_modifiers(hemi, [d1.name, d2.name])
    shade_smooth(hemi, angle_deg=42)
    hemi.data.materials.append(MAT_BRAIN)

# núcleo interno brilhante (visível nas frestas/sulco entre hemisférios)
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.22, location=(0, 0, 1.65))
brain_core = bpy.context.active_object
brain_core.name = "BrainCore"
brain_core.data.materials.append(MAT_BRAIN_CORE)

brain_group = brain_parts + [brain_core]

# nós neurais distribuídos pelos DOIS hemisférios + conexões
node_objs = []
count = 70
golden = math.pi * (1 + 5 ** 0.5)
for i in range(count):
    t = i / max(1, count - 1)
    incl = math.acos(1 - 2 * t)
    az = golden * i
    side = 1 if math.cos(az) >= 0 else -1
    r = 0.52 * random.uniform(0.92, 1.06)
    x = side * 0.19 + r * math.sin(incl) * math.cos(az) * 0.62
    y = r * math.sin(incl) * math.sin(az) * 0.82
    z = 1.65 + r * math.cos(incl) * 0.82
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.022, location=(x, y, z))
    node = bpy.context.active_object
    node.data.materials.append(MAT_NODE)
    node_objs.append((node, (x, y, z)))

bpy.ops.object.select_all(action='DESELECT')
for n, _ in node_objs:
    n.select_set(True)
bpy.context.view_layer.objects.active = node_objs[0][0]
bpy.ops.object.join()
nodes_joined = bpy.context.active_object
nodes_joined.name = "NeuralNodes"
brain_group.append(nodes_joined)

# linhas de conexão entre nós próximos (curve, não mesh, mais barato)
positions = [p for _, p in node_objs]
curve_data = bpy.data.curves.new("NeuralLines", type='CURVE')
curve_data.dimensions = '3D'
curve_data.bevel_depth = 0.0035
curve_data.bevel_resolution = 1
max_edges = 110
made = 0
for i, a in enumerate(positions):
    if made >= max_edges:
        break
    dists = sorted(range(len(positions)), key=lambda j: (
        (positions[j][0]-a[0])**2 + (positions[j][1]-a[1])**2 + (positions[j][2]-a[2])**2))
    for j in dists[1:3]:
        b = positions[j]
        d = ((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2) ** 0.5
        if d > 0.42:
            continue
        spline = curve_data.splines.new('POLY')
        spline.points.add(1)
        spline.points[0].co = (*a, 1)
        spline.points[1].co = (*b, 1)
        made += 1
    if made >= max_edges:
        break

lines_obj = bpy.data.objects.new("NeuralLines", curve_data)
bpy.context.collection.objects.link(lines_obj)
lines_obj.data.materials.append(MAT_GLASS_EDGE)
brain_group.append(lines_obj)

brain_root = bpy.data.objects.new("BrainRoot", None)
bpy.context.collection.objects.link(brain_root)
for obj in brain_group:
    obj.parent = brain_root

# ==================================================================
# 7. ORGANIZAR HIERARQUIA E EXPORTAR
# ==================================================================

root = bpy.data.objects.new("FM_Core_Root", None)
bpy.context.collection.objects.link(root)
for obj in bpy.context.collection.objects:
    if obj.name not in ("FM_Core_Root",) and obj.parent is None:
        obj.parent = root

out_path = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/fm-core-v2.glb"
bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format='GLB',
    use_selection=False,
    export_apply=True,
    export_materials='EXPORT',
    export_lights=False,
    export_cameras=False,
    export_yup=True,
)
print(f"EXPORTED_GLB: {out_path}")

total_tris = 0
depsgraph = bpy.context.evaluated_depsgraph_get()
for obj in bpy.context.collection.objects:
    if obj.type == 'MESH':
        eval_obj = obj.evaluated_get(depsgraph)
        mesh = eval_obj.to_mesh()
        mesh.calc_loop_triangles()
        total_tris += len(mesh.loop_triangles)
        eval_obj.to_mesh_clear()
print(f"TOTAL_TRIS: {total_tris}")
