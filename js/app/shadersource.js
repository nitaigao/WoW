function BasicShaderSource() { }
BasicShaderSource.VERTEX_SOURCE = "attribute vec4 position; void main() { gl_Position = position; }"
BasicShaderSource.FRAGMENT_SOURCE = "void main() { gl_FragColor = vec4(0.2, 0.6, 0.9, 1.0); } "

function ProjectionShaderSource() { }
ProjectionShaderSource.VERTEX_SOURCE = "attribute vec4 position; uniform mat4 projection; uniform mat4 view; void main() { gl_Position = projection * view * position; }"
ProjectionShaderSource.FRAGMENT_SOURCE = "void main() { gl_FragColor = vec4(0.2, 0.6, 0.9, 1.0); } "

function NormalsShaderSource() { }
NormalsShaderSource.VERTEX_SOURCE = "attribute vec4 position; attribute vec3 normal; uniform mat4 projection; uniform mat4 view; varying vec3 vColor; void main() { vColor = normal; gl_Position = projection * view * position; }"
NormalsShaderSource.FRAGMENT_SOURCE = "precision mediump float; varying vec3 vColor; void main() { gl_FragColor = vec4(vColor, 1.0); } "
