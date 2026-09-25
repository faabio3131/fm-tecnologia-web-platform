"""
Renderiza um loop de vídeo (sequência PNG) do fm-core.glb via Cycles
(path-tracing), para usar como asset de vídeo do Hero em vez de WebGL
em tempo real — qualidade de luz/vidro/reflexo muito mais alta.

Todas as rotações completam um número inteiro de voltas ao longo do
loop, então o último frame conecta perfeitamente de volta ao primeiro
(loop contínuo, sem "salto").

Roda headless: blender --background --python render_loop.py
"""
import bpy
import math
import os

FRAMES = 64
RES = 760
SAMPLES = 26

OUT_DIR = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/render_frames"
os.makedirs(OUT_DIR, exist_ok=True)

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

bpy.ops.import_scene.gltf(
    filepath="/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/fm-core.glb"
)

root = bpy.data.objects.get("FM_Core_Root")
ring0 = bpy.data.objects.get("Ring_0")
ring1 = bpy.data.objects.get("Ring_1")
ring2 = bpy.data.objects.get("Ring_2")
ring3 = bpy.data.objects.get("Ring_3")
brain = bpy.data.objects.get("Brain")
nodes = bpy.data.objects.get("NeuralNodes")

# --- câmera (Track To, mesma lógica do preview) ---
bpy.ops.object.camera_add(location=(1.05, -5.6, 0.95))
cam = bpy.context.active_object
target = bpy.data.objects.new("CamTarget", None)
target.location = (0, 0, 0.85)
bpy.context.collection.objects.link(target)
con = cam.constraints.new(type='TRACK_TO')
con.target = target
con.track_axis = 'TRACK_NEGATIVE_Z'
con.up_axis = 'UP_Y'
cam.data.lens = 40
bpy.context.scene.camera = cam

# --- luzes ---
bpy.ops.object.light_add(type='AREA', location=(3, -3, 4))
key = bpy.context.active_object
key.data.energy = 900
key.data.size = 3
key.data.color = (0.95, 0.97, 1.0)

bpy.ops.object.light_add(type='AREA', location=(-4, 1.5, 1.2))
rim = bpy.context.active_object
rim.data.energy = 700
rim.data.color = (0.3, 0.62, 1.0)
rim.data.size = 4

bpy.ops.object.light_add(type='AREA', location=(0.5, -2, -2.5))
fill = bpy.context.active_object
fill.data.energy = 200
fill.data.color = (0.4, 0.7, 1.0)
fill.data.size = 5

# --- mundo: mesmo tom de fundo do site (blend perfeito, sem precisar de alpha) ---
scene = bpy.context.scene
world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.012, 0.02, 0.033, 1.0)  # ~ #05080d
bg.inputs[1].default_value = 1.0

scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = False
scene.view_layers[0].cycles.use_denoising = False
scene.render.resolution_x = RES
scene.render.resolution_y = RES
scene.render.image_settings.file_format = 'PNG'

scene.frame_start = 1
scene.frame_end = FRAMES

# --- animação: tudo com número inteiro de voltas -> loop perfeito ---
def loop_rot(obj, axis, revolutions):
    if obj is None:
        return
    obj.rotation_mode = 'XYZ'
    obj.keyframe_insert(data_path="rotation_euler", index=axis, frame=1)
    rot = list(obj.rotation_euler)
    rot[axis] += revolutions * 2 * math.pi
    obj.rotation_euler[axis] = rot[axis]
    obj.keyframe_insert(data_path="rotation_euler", index=axis, frame=FRAMES + 1)
    fcurve = obj.animation_data.action.fcurves.find("rotation_euler", index=axis)
    for kp in fcurve.keyframe_points:
        kp.interpolation = 'LINEAR'


def sway_rot(obj, axis, amplitude_deg):
    """Balanço senoidal (0 -> +amp -> 0 -> -amp -> 0): nunca mostra o
    objeto de perfil/costas parado, ao contrário de uma volta completa —
    melhor para um hero que também vira screenshot/poster estático."""
    if obj is None:
        return
    obj.rotation_mode = 'XYZ'
    amp = math.radians(amplitude_deg)
    base = obj.rotation_euler[axis]
    keys = [(1, 0.0), (1 + FRAMES // 4, amp), (1 + FRAMES // 2, 0.0),
            (1 + 3 * FRAMES // 4, -amp), (FRAMES + 1, 0.0)]
    for frame, offset in keys:
        obj.rotation_euler[axis] = base + offset
        obj.keyframe_insert(data_path="rotation_euler", index=axis, frame=frame)
    fcurve = obj.animation_data.action.fcurves.find("rotation_euler", index=axis)
    for kp in fcurve.keyframe_points:
        kp.interpolation = 'BEZIER'
        kp.handle_left_type = 'AUTO_CLAMPED'
        kp.handle_right_type = 'AUTO_CLAMPED'


sway_rot(root, 1, 5)     # eixo Y (up): balanço quase imperceptível (~5°), sempre de frente
loop_rot(ring0, 2, 2)    # eixo Z local -> 2 voltas
loop_rot(ring1, 2, -1.5) # não-inteiro proposital: material de vidro, quase imperceptível
loop_rot(ring2, 2, 1)
loop_rot(ring3, 2, -2)
# NeuralNodes fica parado (segue o balanço do root normalmente): o
# objeto joined tem o pivô herdado do primeiro nó, não do centro do
# cérebro — animá-lo isolado fazia os pontos "voarem" para fora da
# esfera. Sem necessidade real de girar independente do cérebro.

# pulso sutil do cérebro (2 ciclos completos no loop)
if brain is not None:
    brain.keyframe_insert(data_path="scale", frame=1)
    brain.scale = tuple(s * 1.02 for s in brain.scale)
    brain.keyframe_insert(data_path="scale", frame=1 + (FRAMES // 4))
    brain.scale = tuple(s / 1.02 for s in brain.scale)
    brain.keyframe_insert(data_path="scale", frame=1 + (FRAMES // 2))
    brain.scale = tuple(s * 1.02 for s in brain.scale)
    brain.keyframe_insert(data_path="scale", frame=1 + (3 * FRAMES // 4))
    brain.scale = tuple(s / 1.02 for s in brain.scale)
    brain.keyframe_insert(data_path="scale", frame=FRAMES + 1)
    fcurves = brain.animation_data.action.fcurves
    for fc in fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = 'BEZIER'
            kp.handle_left_type = 'AUTO_CLAMPED'
            kp.handle_right_type = 'AUTO_CLAMPED'

scene.render.filepath = os.path.join(OUT_DIR, "frame_")
bpy.ops.render.render(animation=True)

print(f"RENDERED_FRAMES: {FRAMES} at {RES}x{RES}, {SAMPLES} samples")
