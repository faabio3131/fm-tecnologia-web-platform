"""Render rápido do fm-core.glb isolado (Eevee, headless) só para inspeção visual."""
import bpy
import math

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

bpy.ops.import_scene.gltf(filepath="/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/fm-core.glb")

# câmera com Track To (evita erro manual de rotação/eixo)
bpy.ops.object.camera_add(location=(1.1, -5.4, 1.0))
cam = bpy.context.active_object
target = bpy.data.objects.new("CamTarget", None)
target.location = (0, 0, 0.85)
bpy.context.collection.objects.link(target)
con = cam.constraints.new(type='TRACK_TO')
con.target = target
con.track_axis = 'TRACK_NEGATIVE_Z'
con.up_axis = 'UP_Y'
cam.data.lens = 42
bpy.context.scene.camera = cam

# luzes simples (key + rim azul)
bpy.ops.object.light_add(type='AREA', location=(3, -3, 4))
key = bpy.context.active_object
key.data.energy = 800
key.data.size = 3

bpy.ops.object.light_add(type='AREA', location=(-4, 2, 1))
rim = bpy.context.active_object
rim.data.energy = 600
rim.data.color = (0.3, 0.6, 1.0)
rim.data.size = 4

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 48
scene.cycles.use_denoising = False
scene.view_layers[0].cycles.use_denoising = False
scene.render.resolution_x = 900
scene.render.resolution_y = 900
scene.render.film_transparent = False
scene.world = bpy.data.worlds.new("World")
scene.world.use_nodes = True
bg = scene.world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.02, 0.03, 0.05, 1.0)
bg.inputs[1].default_value = 1.0

scene.render.filepath = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/preview.png"
bpy.ops.render.render(write_still=True)
print("RENDERED")
