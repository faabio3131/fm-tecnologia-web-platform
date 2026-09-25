"""Render frontal + 3/4 do fm-core-v2.glb para comparação com a V3 (parado, sem vídeo)."""
import bpy
import math

def fresh_import():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    bpy.ops.import_scene.gltf(
        filepath="/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/fm-core-v2.glb"
    )

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

    world = bpy.data.worlds.new("World")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs[0].default_value = (0.012, 0.02, 0.033, 1.0)
    bg.inputs[1].default_value = 1.0

    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = 48
    scene.cycles.use_denoising = False
    scene.view_layers[0].cycles.use_denoising = False
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    return scene


def add_camera(location, target_loc):
    bpy.ops.object.camera_add(location=location)
    cam = bpy.context.active_object
    target = bpy.data.objects.new("CamTarget", None)
    target.location = target_loc
    bpy.context.collection.objects.link(target)
    con = cam.constraints.new(type='TRACK_TO')
    con.target = target
    con.track_axis = 'TRACK_NEGATIVE_Z'
    con.up_axis = 'UP_Y'
    cam.data.lens = 40
    bpy.context.scene.camera = cam
    return cam


# --- Frontal ---
scene = fresh_import()
add_camera((0.05, -5.8, 0.95), (0, 0, 0.85))
scene.render.filepath = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/render-v2-frontal.png"
bpy.ops.render.render(write_still=True)

# --- 3/4 ---
scene = fresh_import()
add_camera((2.6, -5.0, 1.15), (0, 0, 0.85))
scene.render.filepath = "/home/user/fm-tecnologia-web-platform/prototypes/fm-home-hero-concept-v1/blender/render-v2-3quarter.png"
bpy.ops.render.render(write_still=True)

print("DONE")
