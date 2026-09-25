"""
Modelagem procedural do FM Core para a V5 (protótipo isolado).

Roda headless: `blender --background --python build_core.py`
Gera prototypes/fm-home-hero-concept-v1/blender/fm-core.glb

Não é escultura artística à mão — é modelagem procedural via bmesh/modifiers
(bevel, inset, boolean, displace), o que já é um salto real sobre primitivas
soltas do three.js: bordas biseladas de verdade, painel frontal recuado de
verdade, cérebro com volume orgânico e não uma esfera/wireframe.
"""

import bpy
import bmesh
import math
import random
from mathutils import Vector

random.seed(7)

# ---------- limpeza da cena padrão ----------
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for block in list(bpy.data.meshes) + list(bpy.data.materials):
    if block.users == 0:
        bpy.data.batch_remove([block])


def new_material(name, base_color, metallic=0.0, roughness=0.5,
                  transmission=0.0, emission_color=None, emission_strength=0.0,
                  ior=1.45):
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
    if emission_color:
        bsdf.inputs["Emission Color"].default_value = (*emission_color, 1.0)
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    if transmission > 0:
        mat.blend_method = 'BLEND'
    return mat


MAT_METAL = new_material("core_metal", (0.55, 0.58, 0.62), metallic=0.95, roughness=0.32)
MAT_METAL_DARK = new_material("core_metal_dark", (0.06, 0.09, 0.13), metallic=0.6, roughness=0.45)
MAT_GLASS = new_material("core_glass", (0.09, 0.28, 0.5), metallic=0.0, roughness=0.06,
                          transmission=0.9, ior=1.4)
MAT_RING_METAL = new_material("ring_metal", (0.72, 0.78, 0.85), metallic=0.9, roughness=0.26)
MAT_RING_CYAN = new_material("ring_cyan", (0.15, 0.55, 0.85), metallic=0.4, roughness=0.2,
                              emission_color=(0.35, 0.75, 1.0), emission_strength=0.6)
MAT_BRAIN = new_material("brain", (0.1, 0.35, 0.6), metallic=0.0, roughness=0.35,
                          emission_color=(0.4, 0.75, 1.0), emission_strength=0.9)
MAT_NODE = new_material("node", (1.0, 1.0, 1.0), metallic=0.0, roughness=0.2,
                         emission_color=(0.75, 0.92, 1.0), emission_strength=2.2)
MAT_BEAM = new_material("beam", (1.0, 1.0, 1.0), metallic=0.0, roughness=0.3,
                         emission_color=(0.7, 0.9, 1.0), emission_strength=1.6)


def apply_bevel(obj, width=0.02, segments=3, limit_angle=math.radians(35)):
    mod = obj.modifiers.new("bevel", type='BEVEL')
    mod.width = width
    mod.segments = segments
    mod.limit_method = 'ANGLE'
    mod.angle_limit = limit_angle
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)


def shade_smooth_flat_mix(obj, angle_deg=35):
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.ops.object.shade_smooth()
    try:
        obj.data.use_auto_smooth = True
        obj.data.auto_smooth_angle = math.radians(angle_deg)
    except AttributeError:
        pass  # Blender 4.1+: auto-smooth virou modifier "Smooth by Angle"


# ==================================================================
# 1. CHASSI OCTOGONAL — corpo com múltiplas camadas, bisel e recesso
# ==================================================================

bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=1.18, depth=1.3, location=(0, 0, 0))
chassis = bpy.context.active_object
chassis.name = "Chassis"
chassis.rotation_euler = (math.radians(90), 0, 0)  # eixo do cilindro -> Z vira "profundidade" da câmera
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)

# recesso frontal: seleciona a face frontal e faz inset + extrude para dentro
# Nota de eixos: o cilindro nasce com eixo em Z (Blender); rotacionamos
# 90° em X e aplicamos a rotação na malha, então o "topo" original
# (max Z) passa a ficar em min Y — é essa a face que vira a "frente"
# (com export_yup, Blender -Y == three.js +Z, ou seja, encara a câmera).
bpy.context.view_layer.objects.active = chassis
bm = bmesh.new()
bm.from_mesh(chassis.data)
bm.faces.ensure_lookup_table()
front_face = min(bm.faces, key=lambda f: f.calc_center_median().y)
inset = bmesh.ops.inset_region(bm, faces=[front_face], thickness=0.10, depth=0.0)
inset_face = inset['faces'][0]
bmesh.ops.translate(bm, verts=inset_face.verts, vec=(0, 0.14, 0))
bm.to_mesh(chassis.data)
bm.free()
chassis.data.update()

apply_bevel(chassis, width=0.035, segments=3)
shade_smooth_flat_mix(chassis)
chassis.data.materials.append(MAT_METAL)

# painel de vidro dentro do recesso (recesso agora ao longo de Y, face frontal)
bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=0.95, depth=0.06, location=(0, -0.565, 0))
glass = bpy.context.active_object
glass.name = "GlassPanel"
glass.rotation_euler = (math.radians(90), 0, 0)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
glass.data.materials.append(MAT_GLASS)
apply_bevel(glass, width=0.01, segments=2)

# moldura escura entre o vidro e a borda do recesso
bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=1.04, depth=0.03, location=(0, -0.595, 0))
frame = bpy.context.active_object
frame.name = "InnerFrame"
frame.rotation_euler = (math.radians(90), 0, 0)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
frame.data.materials.append(MAT_METAL_DARK)

# ==================================================================
# 2. PEÇAS LATERAIS / SUPORTES — dá leitura de "produto", não sólido só
# ==================================================================

for side in (-1, 1):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(side * 1.32, 0, -0.05))
    strut = bpy.context.active_object
    strut.name = f"Strut_{side}"
    strut.scale = (0.14, 0.9, 0.5)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    apply_bevel(strut, width=0.03, segments=2)
    shade_smooth_flat_mix(strut)
    strut.data.materials.append(MAT_METAL_DARK)

# ==================================================================
# 3. ANÉIS ORBITAIS MODELADOS — 4 anéis, seções e materiais distintos
# ==================================================================

ring_defs = [
    dict(major=1.62, minor=0.065, seg_minor=8, tilt=(75, 17, 0), mat=MAT_RING_METAL),
    dict(major=1.9, minor=0.032, seg_minor=10, tilt=(68, -22, 12), mat=MAT_RING_CYAN),
    dict(major=1.4, minor=0.05, seg_minor=8, tilt=(96, 9, -14), mat=MAT_RING_METAL),
    dict(major=2.1, minor=0.026, seg_minor=10, tilt=(102, -14, 30), mat=MAT_RING_METAL),
]

for i, r in enumerate(ring_defs):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=r["major"], minor_radius=r["minor"],
        major_segments=64, minor_segments=r["seg_minor"],
        location=(0, 0, 0),
    )
    ring = bpy.context.active_object
    ring.name = f"Ring_{i}"
    ring.rotation_euler = (math.radians(r["tilt"][0]), math.radians(r["tilt"][1]), math.radians(r["tilt"][2]))
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    ring.data.materials.append(r["mat"])

# eixo energético central
bpy.ops.mesh.primitive_cylinder_add(vertices=10, radius=0.02, depth=0.85, location=(0, 0, 1.05))
beam = bpy.context.active_object
beam.name = "EnergyBeam"
beam.data.materials.append(MAT_BEAM)

# ==================================================================
# 4. CÉREBRO ORGÂNICO — volume real, dois hemisférios, nós, conexões
# ==================================================================

bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=0.62, location=(0, 0, 1.62))
brain = bpy.context.active_object
brain.name = "Brain"
brain.scale = (1.08, 0.86, 0.92)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

# textura de nuvens para dar volume orgânico (deslocamento), não esfera perfeita
cloud_tex = bpy.data.textures.new("brain_bumps", type='CLOUDS')
cloud_tex.noise_scale = 0.45
disp = brain.modifiers.new("organic", type='DISPLACE')
disp.texture = cloud_tex
disp.strength = 0.07
bpy.context.view_layer.objects.active = brain
bpy.ops.object.modifier_apply(modifier=disp.name)

# sulco central sugerindo os dois hemisférios (boolean difference com cunha fina)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 1.62))
groove = bpy.context.active_object
groove.scale = (0.035, 0.7, 0.62)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
boolmod = brain.modifiers.new("groove", type='BOOLEAN')
boolmod.operation = 'DIFFERENCE'
boolmod.object = groove
bpy.context.view_layer.objects.active = brain
bpy.ops.object.modifier_apply(modifier=boolmod.name)
bpy.data.objects.remove(groove, do_unlink=True)

shade_smooth_flat_mix(brain, angle_deg=50)
brain.data.materials.append(MAT_BRAIN)

# nós neurais — pequenas icospheres distribuídas pela superfície (Fibonacci sphere)
node_objs = []
count = 46
golden = math.pi * (1 + 5 ** 0.5)
for i in range(count):
    t = i / max(1, count - 1)
    incl = math.acos(1 - 2 * t)
    az = golden * i
    r = 0.66 * random.uniform(0.94, 1.05)
    x = r * math.sin(incl) * math.cos(az)
    y = r * math.sin(incl) * math.sin(az) * 0.86
    z = 1.62 + r * math.cos(incl) * 0.92
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.028, location=(x, y, z))
    node = bpy.context.active_object
    node.data.materials.append(MAT_NODE)
    node_objs.append(node)

bpy.ops.object.select_all(action='DESELECT')
for n in node_objs:
    n.select_set(True)
bpy.context.view_layer.objects.active = node_objs[0]
bpy.ops.object.join()
nodes_joined = bpy.context.active_object
nodes_joined.name = "NeuralNodes"

# ==================================================================
# 5. EMBLEMA FM — textura simples no painel de vidro (canvas gerado)
# ==================================================================
# (o texto "FM" já é resolvido no lado do three.js via CanvasTexture,
# igual V4 — não duplicar aqui para não depender de fontes no Blender)

# ==================================================================
# 6. NOMEAR / ORGANIZAR E EXPORTAR
# ==================================================================

root = bpy.data.objects.new("FM_Core_Root", None)
bpy.context.collection.objects.link(root)
for obj in bpy.context.collection.objects:
    if obj.name != "FM_Core_Root" and obj.parent is None:
        obj.parent = root

import os
out_path = os.path.join(os.path.dirname(bpy.data.filepath) or os.getcwd(), "fm-core.glb")
out_path = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/fm-core.glb"

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

# estatística de polígonos para o relatório
total_tris = 0
for obj in bpy.context.collection.objects:
    if obj.type == 'MESH':
        depsgraph = bpy.context.evaluated_depsgraph_get()
        eval_obj = obj.evaluated_get(depsgraph)
        mesh = eval_obj.to_mesh()
        mesh.calc_loop_triangles()
        total_tris += len(mesh.loop_triangles)
        eval_obj.to_mesh_clear()

print(f"TOTAL_TRIS: {total_tris}")
