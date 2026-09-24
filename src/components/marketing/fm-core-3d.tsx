"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export const FM_CORE_STATES = [
  { title: "FM TECNOLOGIA", subtitle: "Tecnologia que conecta" },
  { title: "DADOS", subtitle: "Informação que orienta decisões" },
  { title: "AUTOMAÇÃO", subtitle: "Processos mais inteligentes" },
  { title: "INTELIGÊNCIA", subtitle: "Contexto que aprende e evolui" },
  { title: "OPERAÇÃO", subtitle: "Controle para crescer com clareza" },
  { title: "FM CORE", subtitle: "Dados, automação e inteligência em sintonia" },
] as const;

type Tier = "desktop" | "tablet" | "mobile";
type Mat4 = Float32Array;

type SolidGeometry = {
  vao: WebGLVertexArrayObject;
  indexCount: number;
  buffers: WebGLBuffer[];
};

type LineGeometry = {
  vao: WebGLVertexArrayObject;
  count: number;
  buffer: WebGLBuffer;
};

type Diagnostics = {
  renderer: "webgl2";
  tier: Tier;
  dpr: number;
  triangles: number;
  nominalDrawCalls: number;
  brainNodes: number;
  brainConnections: number;
};

declare global {
  interface Window {
    __FM_CORE3D_DIAGNOSTICS__?: Diagnostics;
  }
}

const TAU = Math.PI * 2;
const FACE_ANGLE = TAU / FM_CORE_STATES.length;

function identity(): Mat4 {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let col = 0; col < 4; col += 1) {
    for (let row = 0; row < 4; row += 1) {
      out[col * 4 + row] =
        a[row] * b[col * 4] +
        a[4 + row] * b[col * 4 + 1] +
        a[8 + row] * b[col * 4 + 2] +
        a[12 + row] * b[col * 4 + 3];
    }
  }
  return out;
}

function translation(x: number, y: number, z: number): Mat4 {
  const out = identity();
  out[12] = x;
  out[13] = y;
  out[14] = z;
  return out;
}

function rotationX(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
}

function rotationY(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
}

function rotationZ(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function scaling(x: number, y: number, z: number): Mat4 {
  return new Float32Array([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
}

function perspective(fov: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

function normalize3(v: [number, number, number]): [number, number, number] {
  const length = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
}

function cross(
  a: [number, number, number],
  b: [number, number, number],
): [number, number, number] {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function lookAt(
  eye: [number, number, number],
  target: [number, number, number],
  up: [number, number, number],
): Mat4 {
  const z = normalize3([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const x = normalize3(cross(up, z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]),
    -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]),
    -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]),
    1,
  ]);
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("WebGL shader allocation failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unknown shader compile error";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
  const program = gl.createProgram();
  if (!program) throw new Error("WebGL program allocation failed");
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "Unknown WebGL link error";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function createSolidGeometry(
  gl: WebGL2RenderingContext,
  positions: number[],
  normals: number[],
  uvs: number[],
  indices: number[],
): SolidGeometry {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("WebGL VAO allocation failed");
  gl.bindVertexArray(vao);
  const buffers: WebGLBuffer[] = [];

  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const uvBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  if (!positionBuffer || !normalBuffer || !uvBuffer || !indexBuffer) {
    throw new Error("WebGL buffer allocation failed");
  }
  buffers.push(positionBuffer, normalBuffer, uvBuffer, indexBuffer);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindVertexArray(null);

  return { vao, indexCount: indices.length, buffers };
}

function createPlane(gl: WebGL2RenderingContext, width: number, height: number) {
  const w = width / 2;
  const h = height / 2;
  return createSolidGeometry(
    gl,
    [-w, -h, 0, w, -h, 0, w, h, 0, -w, h, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1],
    [0, 1, 2, 0, 2, 3],
  );
}

function createBox(gl: WebGL2RenderingContext, width: number, height: number, depth: number) {
  const x = width / 2;
  const y = height / 2;
  const z = depth / 2;
  const positions = [
    -x,-y,z, x,-y,z, x,y,z, -x,y,z,
    x,-y,-z, -x,-y,-z, -x,y,-z, x,y,-z,
    x,-y,z, x,-y,-z, x,y,-z, x,y,z,
    -x,-y,-z, -x,-y,z, -x,y,z, -x,y,-z,
    -x,y,z, x,y,z, x,y,-z, -x,y,-z,
    -x,-y,-z, x,-y,-z, x,-y,z, -x,-y,z,
  ];
  const normals = [
    0,0,1, 0,0,1, 0,0,1, 0,0,1,
    0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
    1,0,0, 1,0,0, 1,0,0, 1,0,0,
    -1,0,0, -1,0,0, -1,0,0, -1,0,0,
    0,1,0, 0,1,0, 0,1,0, 0,1,0,
    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
  ];
  const uvs = Array.from({ length: 6 }, () => [0,0, 1,0, 1,1, 0,1]).flat();
  const indices: number[] = [];
  for (let face = 0; face < 6; face += 1) {
    const o = face * 4;
    indices.push(o, o + 1, o + 2, o, o + 2, o + 3);
  }
  return createSolidGeometry(gl, positions, normals, uvs, indices);
}

function createHexPrism(gl: WebGL2RenderingContext, radius: number, height: number) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const half = height / 2;

  for (let i = 0; i < 6; i += 1) {
    const a0 = i * FACE_ANGLE;
    const a1 = (i + 1) * FACE_ANGLE;
    const mid = (a0 + a1) / 2;
    const base = positions.length / 3;
    const verts = [
      [Math.sin(a0) * radius, -half, Math.cos(a0) * radius],
      [Math.sin(a1) * radius, -half, Math.cos(a1) * radius],
      [Math.sin(a1) * radius, half, Math.cos(a1) * radius],
      [Math.sin(a0) * radius, half, Math.cos(a0) * radius],
    ];
    verts.forEach((v) => positions.push(...v));
    for (let v = 0; v < 4; v += 1) normals.push(Math.sin(mid), 0, Math.cos(mid));
    uvs.push(0,0, 1,0, 1,1, 0,1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }

  for (const top of [1, -1]) {
    const y = top * half;
    const center = positions.length / 3;
    positions.push(0, y, 0);
    normals.push(0, top, 0);
    uvs.push(.5, .5);
    for (let i = 0; i < 6; i += 1) {
      const angle = i * FACE_ANGLE;
      positions.push(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
      normals.push(0, top, 0);
      uvs.push(.5 + Math.sin(angle) * .5, .5 + Math.cos(angle) * .5);
    }
    for (let i = 0; i < 6; i += 1) {
      const next = (i + 1) % 6;
      if (top > 0) indices.push(center, center + 1 + next, center + 1 + i);
      else indices.push(center, center + 1 + i, center + 1 + next);
    }
  }

  return createSolidGeometry(gl, positions, normals, uvs, indices);
}

function createSphere(
  gl: WebGL2RenderingContext,
  radius: number,
  widthSegments: number,
  heightSegments: number,
) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let y = 0; y <= heightSegments; y += 1) {
    const v = y / heightSegments;
    const phi = v * Math.PI;
    for (let x = 0; x <= widthSegments; x += 1) {
      const u = x / widthSegments;
      const theta = u * TAU;
      const nx = Math.sin(phi) * Math.sin(theta);
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * Math.cos(theta);
      positions.push(nx * radius, ny * radius, nz * radius);
      normals.push(nx, ny, nz);
      uvs.push(u, 1 - v);
    }
  }

  const stride = widthSegments + 1;
  for (let y = 0; y < heightSegments; y += 1) {
    for (let x = 0; x < widthSegments; x += 1) {
      const a = y * stride + x;
      const b = a + stride;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  return createSolidGeometry(gl, positions, normals, uvs, indices);
}

function createTorus(
  gl: WebGL2RenderingContext,
  major: number,
  tube: number,
  radialSegments: number,
  tubeSegments: number,
) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= radialSegments; i += 1) {
    const u = (i / radialSegments) * TAU;
    const cu = Math.cos(u);
    const su = Math.sin(u);
    for (let j = 0; j <= tubeSegments; j += 1) {
      const v = (j / tubeSegments) * TAU;
      const cv = Math.cos(v);
      const sv = Math.sin(v);
      positions.push((major + tube * cv) * cu, (major + tube * cv) * su, tube * sv);
      normals.push(cv * cu, cv * su, sv);
      uvs.push(i / radialSegments, j / tubeSegments);
    }
  }

  const stride = tubeSegments + 1;
  for (let i = 0; i < radialSegments; i += 1) {
    for (let j = 0; j < tubeSegments; j += 1) {
      const a = i * stride + j;
      const b = (i + 1) * stride + j;
      indices.push(a, b, b + 1, a, b + 1, a + 1);
    }
  }
  return createSolidGeometry(gl, positions, normals, uvs, indices);
}

function createArcBand(
  gl: WebGL2RenderingContext,
  outerRadius: number,
  innerRadius: number,
  depth: number,
  segments: number,
  arc: number,
  startAngle = -arc / 2,
) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const half = depth / 2;

  const addQuad = (
    a: [number, number, number],
    b: [number, number, number],
    c: [number, number, number],
    d: [number, number, number],
    normal: [number, number, number],
    u0: number,
    u1: number,
  ) => {
    const base = positions.length / 3;
    positions.push(...a, ...b, ...c, ...d);
    normals.push(...normal, ...normal, ...normal, ...normal);
    uvs.push(u0, 0, u1, 0, u1, 1, u0, 1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };

  for (let i = 0; i < segments; i += 1) {
    const u0 = i / segments;
    const u1 = (i + 1) / segments;
    const a0 = startAngle + arc * u0;
    const a1 = startAngle + arc * u1;
    const c0 = Math.cos(a0);
    const s0 = Math.sin(a0);
    const c1 = Math.cos(a1);
    const s1 = Math.sin(a1);
    addQuad(
      [c0 * innerRadius, s0 * innerRadius, half],
      [c0 * outerRadius, s0 * outerRadius, half],
      [c1 * outerRadius, s1 * outerRadius, half],
      [c1 * innerRadius, s1 * innerRadius, half],
      [0, 0, 1], u0, u1,
    );
    addQuad(
      [c1 * innerRadius, s1 * innerRadius, -half],
      [c1 * outerRadius, s1 * outerRadius, -half],
      [c0 * outerRadius, s0 * outerRadius, -half],
      [c0 * innerRadius, s0 * innerRadius, -half],
      [0, 0, -1], u0, u1,
    );
    const mid = (a0 + a1) / 2;
    addQuad(
      [c0 * outerRadius, s0 * outerRadius, -half],
      [c1 * outerRadius, s1 * outerRadius, -half],
      [c1 * outerRadius, s1 * outerRadius, half],
      [c0 * outerRadius, s0 * outerRadius, half],
      [Math.cos(mid), Math.sin(mid), 0], u0, u1,
    );
    addQuad(
      [c1 * innerRadius, s1 * innerRadius, -half],
      [c0 * innerRadius, s0 * innerRadius, -half],
      [c0 * innerRadius, s0 * innerRadius, half],
      [c1 * innerRadius, s1 * innerRadius, half],
      [-Math.cos(mid), -Math.sin(mid), 0], u0, u1,
    );
  }
  return createSolidGeometry(gl, positions, normals, uvs, indices);
}

function createHorizontalArcBand(
  gl: WebGL2RenderingContext,
  outerRadius: number,
  innerRadius: number,
  depth: number,
  segments: number,
  arc: number,
  startAngle = -arc / 2,
) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const half = depth / 2;
  const addQuad = (
    a: [number, number, number],
    b: [number, number, number],
    c: [number, number, number],
    d: [number, number, number],
    normal: [number, number, number],
    u0: number,
    u1: number,
  ) => {
    const base = positions.length / 3;
    positions.push(...a, ...b, ...c, ...d);
    normals.push(...normal, ...normal, ...normal, ...normal);
    uvs.push(u0, 0, u1, 0, u1, 1, u0, 1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };

  for (let i = 0; i < segments; i += 1) {
    const u0 = i / segments;
    const u1 = (i + 1) / segments;
    const a0 = startAngle + arc * u0;
    const a1 = startAngle + arc * u1;
    const c0 = Math.cos(a0);
    const s0 = Math.sin(a0);
    const c1 = Math.cos(a1);
    const s1 = Math.sin(a1);
    addQuad(
      [c0 * innerRadius, half, s0 * innerRadius],
      [c0 * outerRadius, half, s0 * outerRadius],
      [c1 * outerRadius, half, s1 * outerRadius],
      [c1 * innerRadius, half, s1 * innerRadius],
      [0, 1, 0], u0, u1,
    );
    addQuad(
      [c1 * innerRadius, -half, s1 * innerRadius],
      [c1 * outerRadius, -half, s1 * outerRadius],
      [c0 * outerRadius, -half, s0 * outerRadius],
      [c0 * innerRadius, -half, s0 * innerRadius],
      [0, -1, 0], u0, u1,
    );
    const mid = (a0 + a1) / 2;
    addQuad(
      [c0 * outerRadius, -half, s0 * outerRadius],
      [c1 * outerRadius, -half, s1 * outerRadius],
      [c1 * outerRadius, half, s1 * outerRadius],
      [c0 * outerRadius, half, s0 * outerRadius],
      [Math.cos(mid), 0, Math.sin(mid)], u0, u1,
    );
    addQuad(
      [c1 * innerRadius, -half, s1 * innerRadius],
      [c0 * innerRadius, -half, s0 * innerRadius],
      [c0 * innerRadius, half, s0 * innerRadius],
      [c1 * innerRadius, half, s1 * innerRadius],
      [-Math.cos(mid), 0, -Math.sin(mid)], u0, u1,
    );
  }
  return createSolidGeometry(gl, positions, normals, uvs, indices);
}

function createPolygonPlate(
  gl: WebGL2RenderingContext,
  sides: number,
  radiusX: number,
  radiusY: number,
  depth: number,
) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const half = depth / 2;

  const frontCenter = positions.length / 3;
  positions.push(0, 0, half);
  normals.push(0, 0, 1);
  uvs.push(.5, .5);
  for (let i = 0; i < sides; i += 1) {
    const angle = Math.PI / sides + i * TAU / sides;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    positions.push(x, y, half);
    normals.push(0, 0, 1);
    uvs.push(.5 + x / (radiusX * 2), .5 + y / (radiusY * 2));
  }
  for (let i = 0; i < sides; i += 1) {
    const next = (i + 1) % sides;
    indices.push(frontCenter, frontCenter + 1 + i, frontCenter + 1 + next);
  }

  const backCenter = positions.length / 3;
  positions.push(0, 0, -half);
  normals.push(0, 0, -1);
  uvs.push(.5, .5);
  for (let i = 0; i < sides; i += 1) {
    const angle = Math.PI / sides + i * TAU / sides;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    positions.push(x, y, -half);
    normals.push(0, 0, -1);
    uvs.push(.5 + x / (radiusX * 2), .5 + y / (radiusY * 2));
  }
  for (let i = 0; i < sides; i += 1) {
    const next = (i + 1) % sides;
    indices.push(backCenter, backCenter + 1 + next, backCenter + 1 + i);
  }

  for (let i = 0; i < sides; i += 1) {
    const next = (i + 1) % sides;
    const a0 = Math.PI / sides + i * TAU / sides;
    const a1 = Math.PI / sides + next * TAU / sides;
    const x0 = Math.cos(a0) * radiusX;
    const y0 = Math.sin(a0) * radiusY;
    const x1 = Math.cos(a1) * radiusX;
    const y1 = Math.sin(a1) * radiusY;
    const nx = Math.cos((a0 + a1) / 2);
    const ny = Math.sin((a0 + a1) / 2);
    const base = positions.length / 3;
    positions.push(x0,y0,-half, x1,y1,-half, x1,y1,half, x0,y0,half);
    normals.push(nx,ny,0, nx,ny,0, nx,ny,0, nx,ny,0);
    uvs.push(0,0,1,0,1,1,0,1);
    indices.push(base,base+1,base+2, base,base+2,base+3);
  }
  return createSolidGeometry(gl, positions, normals, uvs, indices);
}

function createCircleLines(gl: WebGL2RenderingContext, segments: number) {
  const points: number[] = [];
  for (let i = 0; i < segments; i += 1) {
    const a0 = i / segments * TAU;
    const a1 = (i + 1) / segments * TAU;
    points.push(Math.cos(a0), Math.sin(a0), 0, Math.cos(a1), Math.sin(a1), 0);
  }
  return createLineGeometry(gl, points);
}

function createWireSphere(
  gl: WebGL2RenderingContext,
  latSegments: number,
  lonSegments: number,
) {
  const lines: number[] = [];
  const point = (phi: number, theta: number): [number, number, number] => [
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.cos(theta),
  ];

  for (let lat = 1; lat < latSegments; lat += 1) {
    const phi = (lat / latSegments) * Math.PI;
    for (let lon = 0; lon < lonSegments; lon += 1) {
      const theta0 = (lon / lonSegments) * TAU;
      const theta1 = ((lon + 1) / lonSegments) * TAU;
      lines.push(...point(phi, theta0), ...point(phi, theta1));
    }
  }

  for (let lon = 0; lon < lonSegments; lon += 1) {
    const theta = (lon / lonSegments) * TAU;
    for (let lat = 0; lat < latSegments; lat += 1) {
      const phi0 = (lat / latSegments) * Math.PI;
      const phi1 = ((lat + 1) / latSegments) * Math.PI;
      lines.push(...point(phi0, theta), ...point(phi1, theta));
    }
  }

  return createLineGeometry(gl, lines);
}

function createLineGeometry(gl: WebGL2RenderingContext, positions: number[]): LineGeometry {
  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();
  if (!vao || !buffer) throw new Error("WebGL line buffer allocation failed");
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return { vao, count: positions.length / 3, buffer };
}

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function brainGeometry(nodeCount: number) {
  const random = seededRandom(240926);
  const points: [number, number, number][] = [];
  for (let i = 0; i < nodeCount; i += 1) {
    const lobe = i % 2 === 0 ? -1 : 1;
    const theta = random() * TAU;
    const phi = Math.acos(2 * random() - 1);
    const radius = .68 + random() * .36;
    const x = lobe * .60 + Math.sin(phi) * Math.cos(theta) * 1.10 * radius;
    const y = 2.18 + Math.cos(phi) * .83 * radius;
    const z = Math.sin(phi) * Math.sin(theta) * .88 * radius;
    points.push([x, y, z]);
  }

  const lines: number[] = [];
  let connections = 0;
  for (let i = 0; i < points.length; i += 1) {
    const candidates: { j: number; d: number }[] = [];
    for (let j = i + 1; j < points.length; j += 1) {
      const dx = points[i][0] - points[j][0];
      const dy = points[i][1] - points[j][1];
      const dz = points[i][2] - points[j][2];
      const d = Math.hypot(dx, dy, dz);
      if (d < .82) candidates.push({ j, d });
    }
    candidates.sort((a, b) => a.d - b.d);
    for (const candidate of candidates.slice(0, 3)) {
      lines.push(...points[i], ...points[candidate.j]);
      connections += 1;
    }
  }
  return { nodes: points.flat(), lines, connections };
}

function createFaceTexture(
  gl: WebGL2RenderingContext,
  state: (typeof FM_CORE_STATES)[number],
  index: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable for Core face texture");

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#071426");
  gradient.addColorStop(.52, "#08172d");
  gradient.addColorStop(1, "#020814");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const glow = ctx.createRadialGradient(500, 280, 30, 500, 280, 520);
  glow.addColorStop(0, "rgba(11,92,255,.24)");
  glow.addColorStop(.48, "rgba(0,210,255,.08)");
  glow.addColorStop(1, "rgba(0,210,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(0,210,255,.66)";
  ctx.lineWidth = 7;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
  ctx.strokeStyle = "rgba(96,165,255,.22)";
  ctx.lineWidth = 2;
  ctx.strokeRect(49, 49, canvas.width - 98, canvas.height - 98);

  if (index === 0) {
    ctx.save();
    ctx.translate(92, 150);
    ctx.fillStyle = "#13d9ff";
    ctx.shadowColor = "rgba(0,210,255,.8)";
    ctx.shadowBlur = 28;
    ctx.beginPath();
    ctx.moveTo(0, 66); ctx.lineTo(74, 0); ctx.lineTo(155, 0); ctx.lineTo(72, 78); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(56, 128); ctx.lineTo(126, 64); ctx.lineTo(191, 64); ctx.lineTo(112, 138); ctx.closePath(); ctx.fill();
    ctx.restore();

    ctx.shadowColor = "rgba(0,210,255,.42)";
    ctx.shadowBlur = 24;
    ctx.fillStyle = "#f4fbff";
    ctx.font = '900 178px "Segoe UI", Arial, sans-serif';
    ctx.fillText("FM", 310, 290);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#e9f5ff";
    ctx.font = '700 60px "Segoe UI", Arial, sans-serif';
    ctx.fillText("FM Tecnologia", 312, 372);
    ctx.fillStyle = "#72cfff";
    ctx.font = '700 24px "Segoe UI", Arial, sans-serif';
    ctx.letterSpacing = "6px";
    ctx.fillText("CORE INTELLIGENCE SYSTEM", 314, 425);
  } else {
    ctx.fillStyle = "#14d9ff";
    ctx.font = '800 24px "Segoe UI", Arial, sans-serif';
    ctx.letterSpacing = "7px";
    ctx.fillText("FM CORE // " + String(index + 1).padStart(2, "0"), 74, 104);
    ctx.shadowColor = "rgba(0,210,255,.42)";
    ctx.shadowBlur = 26;
    ctx.fillStyle = "#f4fbff";
    ctx.font = '800 82px "Segoe UI", Arial, sans-serif';
    ctx.letterSpacing = "0px";
    ctx.fillText(state.title, 74, 260);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#a6cae9";
    ctx.font = '600 36px "Segoe UI", Arial, sans-serif';
    const words = state.subtitle.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const next = current ? current + " " + word : word;
      if (ctx.measureText(next).width > 820 && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    if (current) lines.push(current);
    lines.slice(0, 2).forEach((line, lineIndex) => ctx.fillText(line, 74, 344 + lineIndex * 48));
  }

  ctx.fillStyle = "#0b5cff";
  ctx.fillRect(74, 494, 198, 7);
  ctx.fillStyle = "#00d2ff";
  ctx.fillRect(272, 494, 116, 7);

  const texture = gl.createTexture();
  if (!texture) throw new Error("WebGL texture allocation failed");
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function FmCore3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationStepRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const reducedMotionRef = useRef(reducedMotion);
  const [rotationStep, setRotationStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");

  const activeState = ((rotationStep % FM_CORE_STATES.length) + FM_CORE_STATES.length) % FM_CORE_STATES.length;
  const state = FM_CORE_STATES[activeState];

  useEffect(() => {
    rotationStepRef.current = rotationStep;
  }, [rotationStep]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const interval = window.setInterval(() => {
      setRotationStep((current) => current + 1);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [paused, reducedMotion]);

  const stateLabel = useMemo(() => state.title + " — " + state.subtitle, [state]);

  function selectState(index: number) {
    setRotationStep((current) => {
      const currentIndex = ((current % FM_CORE_STATES.length) + FM_CORE_STATES.length) % FM_CORE_STATES.length;
      const forward = (index - currentIndex + FM_CORE_STATES.length) % FM_CORE_STATES.length;
      return current + forward;
    });
  }

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const glContext = canvasElement.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });

    if (!glContext) {
      setStatus("fallback");
      canvasElement.dataset.renderer = "unavailable";
      return;
    }

    const canvas: HTMLCanvasElement = canvasElement;
    const gl: WebGL2RenderingContext = glContext;

    let disposed = false;
    let frame = 0;
    let visible = true;
    let currentRotation = 0;
    let lastTime = performance.now();
    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;

    const width = window.innerWidth;
    const tier: Tier = width <= 680 ? "mobile" : width <= 1100 ? "tablet" : "desktop";
    const dprCap = tier === "desktop" ? 1.5 : tier === "tablet" ? 1.25 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const radialSegments = tier === "desktop" ? 96 : tier === "tablet" ? 68 : 48;
    const tubeSegments = tier === "desktop" ? 12 : 8;
    const brainNodes = tier === "desktop" ? 118 : tier === "tablet" ? 86 : 58;

    const solidVertex = `#version 300 es
      layout(location=0) in vec3 aPosition;
      layout(location=1) in vec3 aNormal;
      layout(location=2) in vec2 aUv;
      uniform mat4 uModel;
      uniform mat4 uView;
      uniform mat4 uProjection;
      out vec3 vWorld;
      out vec3 vNormal;
      out vec2 vUv;
      void main() {
        vec4 world = uModel * vec4(aPosition, 1.0);
        vWorld = world.xyz;
        vNormal = normalize(mat3(uModel) * aNormal);
        vUv = aUv;
        gl_Position = uProjection * uView * world;
      }`;

    const solidFragment = `#version 300 es
      precision highp float;
      in vec3 vWorld;
      in vec3 vNormal;
      in vec2 vUv;
      uniform vec3 uBaseColor;
      uniform vec3 uEmissiveColor;
      uniform vec3 uCameraPosition;
      uniform float uMetallic;
      uniform float uEmissiveStrength;
      uniform float uOpacity;
      uniform bool uUseTexture;
      uniform sampler2D uTexture;
      out vec4 outColor;
      void main() {
        vec3 N = normalize(vNormal);
        vec3 L = normalize(vec3(4.6, 5.8, 7.2) - vWorld);
        vec3 V = normalize(uCameraPosition - vWorld);
        vec3 H = normalize(L + V);
        float diffuse = max(dot(N, L), 0.0);
        float specular = pow(max(dot(N, H), 0.0), mix(24.0, 92.0, uMetallic));
        float rim = pow(1.0 - max(dot(N, V), 0.0), 2.6);
        vec4 texel = uUseTexture ? texture(uTexture, vUv) : vec4(1.0);
        vec3 base = uBaseColor * texel.rgb;
        vec3 color = base * (0.20 + diffuse * 0.78);
        color += specular * vec3(0.82, 0.93, 1.0) * (0.36 + 1.04 * uMetallic);
        color += rim * vec3(0.0, 0.58, 1.0) * 0.52;
        color += uEmissiveColor * uEmissiveStrength;
        outColor = vec4(color, texel.a * uOpacity);
      }`;

    const lineVertex = `#version 300 es
      layout(location=0) in vec3 aPosition;
      uniform mat4 uModel;
      uniform mat4 uView;
      uniform mat4 uProjection;
      uniform float uPointSize;
      void main() {
        gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
        gl_PointSize = uPointSize;
      }`;

    const lineFragment = `#version 300 es
      precision highp float;
      uniform vec4 uColor;
      uniform bool uRoundPoint;
      out vec4 outColor;
      void main() {
        if (uRoundPoint) {
          vec2 c = gl_PointCoord - vec2(0.5);
          if (dot(c, c) > 0.25) discard;
        }
        outColor = uColor;
      }`;

    const solidProgram = createProgram(gl, solidVertex, solidFragment);
    const lineProgram = createProgram(gl, lineVertex, lineFragment);

    const sphere = createSphere(gl, 1, tier === "mobile" ? 20 : 30, tier === "mobile" ? 12 : 20);
    const shellOuter = createHexPrism(gl, 1.50, 2.08);
    const shellInner = createHexPrism(gl, 1.25, 1.84);
    const topHub = createHexPrism(gl, 1.10, .28);
    const beam = createHexPrism(gl, .056, 7.25);
    const plaque = createPlane(gl, 2.14, 1.46);
    const frameOuter = createPolygonPlate(gl, 8, 1.43, 1.08, .20);
    const frameMid = createPolygonPlate(gl, 8, 1.29, .96, .14);
    const armorMain = createBox(gl, .52, 1.54, .28);
    const armorCap = createBox(gl, .78, .40, .24);
    const crystal = createBox(gl, .31, 1.10, .20);
    const collarTorus = createTorus(gl, 1.12, .064, Math.max(42, Math.floor(radialSegments * .72)), tubeSegments);
    const baseTorus = createTorus(gl, 1.46, .078, Math.max(44, Math.floor(radialSegments * .78)), tubeSegments);
    const ringWide = createHorizontalArcBand(gl, 3.18, 2.86, .135, radialSegments, Math.PI * 1.66);
    const ringMedium = createHorizontalArcBand(gl, 2.90, 2.66, .105, Math.max(36, Math.floor(radialSegments * .78)), Math.PI * 1.52);
    const ringFine = createHorizontalArcBand(gl, 3.32, 3.23, .068, Math.max(40, Math.floor(radialSegments * .84)), Math.PI * 1.82);
    const ringEnergy = createHorizontalArcBand(gl, 3.14, 3.075, .145, Math.max(42, Math.floor(radialSegments * .86)), Math.PI * 1.63);
    const faceTextures = FM_CORE_STATES.map((item, index) => createFaceTexture(gl, item, index));

    const brain = brainGeometry(brainNodes);
    const brainLines = createLineGeometry(gl, brain.lines);
    const brainPoints = createLineGeometry(gl, brain.nodes);
    const brainShell = createWireSphere(gl, tier === "mobile" ? 7 : 10, tier === "mobile" ? 10 : 16);
    const orbitLines = createCircleLines(gl, tier === "mobile" ? 42 : 64);

    const resources = [
      sphere, shellOuter, shellInner, topHub, beam, plaque, frameOuter, frameMid,
      armorMain, armorCap, crystal, collarTorus, baseTorus,
      ringWide, ringMedium, ringFine, ringEnergy,
    ];
    const triangleCount = resources.reduce((sum, item) => sum + item.indexCount / 3, 0) + (plaque.indexCount / 3) * 5 + (frameOuter.indexCount / 3) * 5 + (frameMid.indexCount / 3) * 5;
    const nominalDrawCalls = tier === "mobile" ? 42 : tier === "tablet" ? 50 : 58;

    const diagnostics: Diagnostics = {
      renderer: "webgl2",
      tier,
      dpr,
      triangles: Math.round(triangleCount),
      nominalDrawCalls,
      brainNodes,
      brainConnections: brain.connections,
    };
    window.__FM_CORE3D_DIAGNOSTICS__ = diagnostics;
    canvas.dataset.renderer = "webgl2";
    canvas.dataset.tier = tier;
    canvas.dataset.triangles = String(diagnostics.triangles);
    canvas.dataset.drawCalls = String(nominalDrawCalls);
    canvas.dataset.brainNodes = String(brainNodes);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const solidUniforms = {
      model: gl.getUniformLocation(solidProgram, "uModel"),
      view: gl.getUniformLocation(solidProgram, "uView"),
      projection: gl.getUniformLocation(solidProgram, "uProjection"),
      baseColor: gl.getUniformLocation(solidProgram, "uBaseColor"),
      emissiveColor: gl.getUniformLocation(solidProgram, "uEmissiveColor"),
      cameraPosition: gl.getUniformLocation(solidProgram, "uCameraPosition"),
      metallic: gl.getUniformLocation(solidProgram, "uMetallic"),
      emissiveStrength: gl.getUniformLocation(solidProgram, "uEmissiveStrength"),
      opacity: gl.getUniformLocation(solidProgram, "uOpacity"),
      useTexture: gl.getUniformLocation(solidProgram, "uUseTexture"),
      texture: gl.getUniformLocation(solidProgram, "uTexture"),
    };

    const lineUniforms = {
      model: gl.getUniformLocation(lineProgram, "uModel"),
      view: gl.getUniformLocation(lineProgram, "uView"),
      projection: gl.getUniformLocation(lineProgram, "uProjection"),
      pointSize: gl.getUniformLocation(lineProgram, "uPointSize"),
      color: gl.getUniformLocation(lineProgram, "uColor"),
      roundPoint: gl.getUniformLocation(lineProgram, "uRoundPoint"),
    };

    let projectionMatrix = identity();
    const cameraPosition: [number, number, number] = tier === "mobile" ? [0, .76, 11.15] : tier === "tablet" ? [0, .80, 10.15] : [0, .84, 9.55];
    const viewMatrix = lookAt(cameraPosition, [0, .48, 0], [0, 1, 0]);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const pixelWidth = Math.max(1, Math.round(rect.width * dpr));
      const pixelHeight = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      projectionMatrix = perspective(36 * Math.PI / 180, canvas.width / canvas.height, .1, 60);
    }

    function setSolidMaterial(
      model: Mat4,
      baseColor: [number, number, number],
      emissive: [number, number, number],
      metallic: number,
      emissiveStrength: number,
      opacity = 1,
      texture: WebGLTexture | null = null,
    ) {
      gl.uniformMatrix4fv(solidUniforms.model, false, model);
      gl.uniform3fv(solidUniforms.baseColor, baseColor);
      gl.uniform3fv(solidUniforms.emissiveColor, emissive);
      gl.uniform3fv(solidUniforms.cameraPosition, cameraPosition);
      gl.uniform1f(solidUniforms.metallic, metallic);
      gl.uniform1f(solidUniforms.emissiveStrength, emissiveStrength);
      gl.uniform1f(solidUniforms.opacity, opacity);
      gl.uniform1i(solidUniforms.useTexture, texture ? 1 : 0);
      if (texture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(solidUniforms.texture, 0);
      }
    }

    function drawSolid(
      geometry: SolidGeometry,
      model: Mat4,
      baseColor: [number, number, number],
      emissive: [number, number, number],
      metallic: number,
      emissiveStrength: number,
      opacity = 1,
      texture: WebGLTexture | null = null,
    ) {
      gl.bindVertexArray(geometry.vao);
      setSolidMaterial(model, baseColor, emissive, metallic, emissiveStrength, opacity, texture);
      gl.drawElements(gl.TRIANGLES, geometry.indexCount, gl.UNSIGNED_SHORT, 0);
    }

    function drawLine(
      geometry: LineGeometry,
      model: Mat4,
      mode: number,
      color: [number, number, number, number],
      pointSize: number,
      roundPoint: boolean,
    ) {
      gl.bindVertexArray(geometry.vao);
      gl.uniformMatrix4fv(lineUniforms.model, false, model);
      gl.uniform4fv(lineUniforms.color, color);
      gl.uniform1f(lineUniforms.pointSize, pointSize * dpr);
      gl.uniform1i(lineUniforms.roundPoint, roundPoint ? 1 : 0);
      gl.drawArrays(mode, 0, geometry.count);
    }

    function render(now: number) {
      if (disposed) return;
      const delta = Math.min((now - lastTime) / 1000, .05);
      lastTime = now;

      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const reduced = reducedMotionRef.current;
      const targetRotation = -rotationStepRef.current * FACE_ANGLE;
      if (reduced) {
        currentRotation = targetRotation;
      } else {
        const diff = targetRotation - currentRotation;
        currentRotation += diff * Math.min(1, delta * 2.6);
      }

      pointerX += (pointerTargetX - pointerX) * Math.min(1, delta * 3.2);
      pointerY += (pointerTargetY - pointerY) * Math.min(1, delta * 3.2);
      const parallaxYaw = reduced || tier !== "desktop" ? 0 : pointerX * .055;
      const parallaxPitch = reduced || tier !== "desktop" ? 0 : pointerY * .035;

      const rootRotation = multiply(rotationX(parallaxPitch), rotationY(parallaxYaw));
      const bodyRotation = multiply(rootRotation, rotationY(currentRotation));
      const time = now / 1000;

      gl.useProgram(solidProgram);
      gl.uniformMatrix4fv(solidUniforms.view, false, viewMatrix);
      gl.uniformMatrix4fv(solidUniforms.projection, false, projectionMatrix);

      const brainTurn = reduced ? 0 : time * .032;
      const brainModel = multiply(rootRotation, rotationY(brainTurn));

      const beamModel = multiply(rootRotation, translation(0, .58, 0));
      drawSolid(beam, beamModel, [.01, .18, .32], [0, .98, 1], .22, 1.72, .62);

      drawSolid(shellOuter, bodyRotation, [.13, .16, .22], [0, .30, .62], 1, .18);
      drawSolid(shellInner, multiply(bodyRotation, scaling(.965, .965, .965)), [.025, .12, .22], [0, .76, 1], .66, .68, .96);

      const upperHubModel = multiply(bodyRotation, translation(0, 1.08, 0));
      const lowerHubModel = multiply(bodyRotation, translation(0, -1.08, 0));
      drawSolid(topHub, upperHubModel, [.40, .46, .54], [0, .58, 1], .99, .34);
      drawSolid(topHub, lowerHubModel, [.24, .31, .40], [0, .48, 1], .99, .28);

      const upperCollar = multiply(bodyRotation, multiply(translation(0, 1.17, 0), rotationX(Math.PI / 2)));
      const lowerCollar = multiply(bodyRotation, multiply(translation(0, -1.17, 0), rotationX(Math.PI / 2)));
      drawSolid(collarTorus, upperCollar, [.48, .53, .60], [0, .68, 1], 1, .43);
      drawSolid(collarTorus, lowerCollar, [.34, .41, .50], [0, .58, 1], 1, .37);

      for (let i = 0; i < 6; i += 1) {
        const faceAngle = i * FACE_ANGLE;
        const frameRadius = 1.43;
        const plaqueRadius = 1.555;
        const frameModel = multiply(bodyRotation, multiply(
          translation(Math.sin(faceAngle) * frameRadius, 0, Math.cos(faceAngle) * frameRadius),
          rotationY(faceAngle),
        ));
        const plaqueModel = multiply(bodyRotation, multiply(
          translation(Math.sin(faceAngle) * plaqueRadius, 0, Math.cos(faceAngle) * plaqueRadius),
          rotationY(faceAngle),
        ));
        drawSolid(frameOuter, frameModel, [.52, .56, .62], [0, .56, .98], 1, .34);
        drawSolid(frameMid, multiply(frameModel, translation(0, 0, .115)), [.055, .12, .22], [0, .90, 1], .90, .66);
        drawSolid(plaque, plaqueModel, [1, 1, 1], [0, .50, .92], .82, .38, 1, faceTextures[i]);

        const armorAngle = faceAngle + FACE_ANGLE / 2;
        const radius = 1.72;
        const ax = Math.sin(armorAngle) * radius;
        const az = Math.cos(armorAngle) * radius;
        const armorModel = multiply(bodyRotation, multiply(translation(ax, 0, az), rotationY(armorAngle)));
        drawSolid(armorMain, armorModel, i % 2 === 0 ? [.44, .48, .54] : [.24, .29, .37], [0, .42, .82], .99, .24);
        drawSolid(armorCap, multiply(bodyRotation, multiply(translation(ax, .82, az), rotationY(armorAngle))), [.36, .42, .50], [0, .46, .86], .99, .22);
        drawSolid(armorCap, multiply(bodyRotation, multiply(translation(ax, -.82, az), rotationY(armorAngle))), [.30, .36, .45], [0, .42, .82], .99, .22);
      }

      gl.disable(gl.CULL_FACE);
      gl.depthMask(false);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      for (const index of [0, 2, 3, 5]) {
        const angle = index * FACE_ANGLE + FACE_ANGLE / 2;
        const radius = 1.80;
        const model = multiply(bodyRotation, multiply(
          translation(Math.sin(angle) * radius, 0, Math.cos(angle) * radius),
          rotationY(angle),
        ));
        drawSolid(crystal, model, [.02, .30, .55], [0, .95, 1], .08, 1.12, .25);
      }
      gl.depthMask(true);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.CULL_FACE);

      const ringCount = tier === "mobile" ? 2 : tier === "tablet" ? 3 : 4;
      const ringGeometry = [ringWide, ringMedium, ringWide, ringFine];
      const ringEnergyGeometry = [ringEnergy, ringFine, ringEnergy, ringFine];
      const speeds = [.068, -.052, .041, -.030];
      const xTilts = [.28, -.36, .18, -.24];
      const zTilts = [.08, -.14, .19, -.23];
      const offsets = [-.10, .72, -1.42, 1.22];
      const scales = [1, .90, .78, .68];
      for (let i = 0; i < ringCount; i += 1) {
        const phase = [.28, -1.10, .88, -1.36][i];
        const spin = reduced ? phase : time * speeds[i] + phase;
        let ringModel = translation(0, offsets[i], 0);
        ringModel = multiply(ringModel, rotationY(spin));
        ringModel = multiply(ringModel, rotationX(xTilts[i]));
        ringModel = multiply(ringModel, rotationZ(zTilts[i]));
        ringModel = multiply(ringModel, scaling(scales[i], scales[i], scales[i]));
        ringModel = multiply(rootRotation, ringModel);
        drawSolid(
          ringGeometry[i],
          ringModel,
          i === 1 ? [.18, .26, .37] : [.46, .51, .58],
          [0, .42, .86],
          .995,
          i === 1 ? .30 : .22,
        );

        gl.disable(gl.CULL_FACE);
        gl.depthMask(false);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        drawSolid(
          ringEnergyGeometry[i],
          multiply(ringModel, translation(0, .018, 0)),
          [.01, .14, .25],
          [0, .92, 1],
          .2,
          reduced ? .72 : .82 + Math.sin(time * 1.1 + i) * .10,
          .24,
        );
        gl.depthMask(true);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.CULL_FACE);
      }

      const baseModel = multiply(bodyRotation, multiply(translation(0, -1.48, 0), rotationX(Math.PI / 2)));
      drawSolid(baseTorus, baseModel, [.40, .47, .56], [0, .74, 1], .99, .42);

      gl.disable(gl.CULL_FACE);
      gl.depthMask(false);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      const brainLobes = [
        multiply(brainModel, multiply(translation(-.66, 2.48, .03), scaling(1.18, .86, .92))),
        multiply(brainModel, multiply(translation(.66, 2.48, .03), scaling(1.18, .86, .92))),
        multiply(brainModel, multiply(translation(-.38, 2.96, -.02), scaling(.92, .68, .78))),
        multiply(brainModel, multiply(translation(.38, 2.96, -.02), scaling(.92, .68, .78))),
        multiply(brainModel, multiply(translation(-.74, 2.06, -.04), scaling(.84, .61, .72))),
        multiply(brainModel, multiply(translation(.74, 2.06, -.04), scaling(.84, .61, .72))),
        multiply(brainModel, multiply(translation(0, 2.08, -.08), scaling(.86, .57, .69))),
      ];
      for (const lobe of brainLobes) {
        drawSolid(
          sphere,
          lobe,
          [.035, .36, .62],
          [0, 1, 1],
          .05,
          reduced ? 1.28 : 1.34 + Math.sin(time * 1.35) * .10,
          .18,
        );
      }
      gl.depthMask(true);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.CULL_FACE);

      gl.useProgram(lineProgram);
      gl.uniformMatrix4fv(lineUniforms.view, false, viewMatrix);
      gl.uniformMatrix4fv(lineUniforms.projection, false, projectionMatrix);
      gl.disable(gl.CULL_FACE);
      gl.depthMask(false);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      for (const lobe of brainLobes) {
        drawLine(brainShell, lobe, gl.LINES, [.22, .88, 1, .28], 1.12, false);
      }
      drawLine(brainLines, brainModel, gl.LINES, [.22, .95, 1, .98], 1.86, false);
      drawLine(brainPoints, brainModel, gl.POINTS, [.98, 1, 1, 1], tier === "mobile" ? 6.8 : 8.9, true);

      const orbitBase = translation(0, 2.48, 0);
      const orbitModels = [
        multiply(rootRotation, multiply(orbitBase, scaling(2.38, 1.28, 2.38))),
        multiply(rootRotation, multiply(orbitBase, multiply(rotationX(.62), scaling(2.52, 1.34, 2.52)))),
        multiply(rootRotation, multiply(orbitBase, multiply(rotationY(.74), multiply(rotationX(-.48), scaling(2.16, 1.18, 2.16))))),
      ];
      orbitModels.forEach((model, index) => {
        drawLine(orbitLines, model, gl.LINES, [.2, .7 + index * .07, 1, .34 - index * .055], 1, false);
      });

      gl.depthMask(true);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.CULL_FACE);
      gl.bindVertexArray(null);

      if (!reduced && visible) frame = window.requestAnimationFrame(render);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotionRef.current && visible) render(performance.now());
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          lastTime = performance.now();
          cancelAnimationFrame(frame);
          frame = window.requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "180px" },
    );
    intersectionObserver.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      if (tier !== "desktop") return;
      const rect = canvas.getBoundingClientRect();
      pointerTargetX = ((event.clientX - rect.left) / rect.width - .5) * 2;
      pointerTargetY = ((event.clientY - rect.top) / rect.height - .5) * -2;
    };
    const onPointerLeave = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    resize();
    setStatus("ready");
    frame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      faceTextures.forEach((texture) => gl.deleteTexture(texture));
      resources.forEach((resource) => {
        gl.deleteVertexArray(resource.vao);
        resource.buffers.forEach((buffer) => gl.deleteBuffer(buffer));
      });
      for (const geometry of [brainLines, brainPoints, brainShell, orbitLines]) {
        gl.deleteVertexArray(geometry.vao);
        gl.deleteBuffer(geometry.buffer);
      }
      gl.deleteProgram(solidProgram);
      gl.deleteProgram(lineProgram);
      if (window.__FM_CORE3D_DIAGNOSTICS__ === diagnostics) {
        delete window.__FM_CORE3D_DIAGNOSTICS__;
      }
    };
  }, []);

  return (
    <div
      className={"fm-core3d fm-core3d--" + status}
      role="group"
      aria-label={"Core 3D da FM Tecnologia. Estado atual: " + stateLabel}
    >
      <div className="fm-core3d__stage">
        <canvas
          ref={canvasRef}
          className="fm-core3d__canvas"
          aria-hidden="true"
          data-core3d="fm-home"
        />
        <div className="fm-core3d__fallback" aria-hidden={status !== "fallback"}>
          <span>FM</span>
          <strong>FM Tecnologia</strong>
          <small>Core Intelligence System</small>
        </div>
        <span className="fm-core3d__renderer-badge" aria-hidden="true">
          {status === "ready" ? "WEBGL 3D" : status === "fallback" ? "FALLBACK" : "INITIALIZING"}
        </span>
      </div>

      <div className="fm-core3d__message">
        <span>{String(activeState + 1).padStart(2, "0")} / 06</span>
        <div>
          <strong>{state.title}</strong>
          <small>{state.subtitle}</small>
        </div>
      </div>

      <div className="fm-core3d__controls" aria-label="Estados do Core 3D">
        <button
          type="button"
          className="fm-core3d__pause"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused || reducedMotion}
          disabled={reducedMotion}
        >
          {reducedMotion ? "Movimento reduzido" : paused ? "Retomar rotação" : "Pausar rotação"}
        </button>
        <div className="fm-core3d__states">
          {FM_CORE_STATES.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === activeState ? "is-active" : ""}
              onClick={() => selectState(index)}
              aria-label={"Mostrar " + item.title + ": " + item.subtitle}
              aria-current={index === activeState ? "true" : undefined}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
