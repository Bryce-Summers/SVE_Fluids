/*
 * Scene.
 * Manages a scene that can be rendered by a Three.js renderer.
 *
 * Written by Bryce Summers on 10 - 3 - 2016.
 */

SVE.Scene = function()
{
    // Initialize Three.js structures.
    this._geometry = new THREE.Geometry();
        
    this._scene    = new THREE.Scene();

    this._material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,//THREE.VertexColors,
        //We use both sides,
        //so that we don't have to waste time reorienting the triangles to face the camera.
        side: THREE.DoubleSide,
        transparent: true,
        blending: THREE.AdditiveBlending, // Additive blending sums up the contributions for intersecting light frustrums.
        depthTest: false, // We negate the depth test to hopefully avoid the need for the non-communitive workarounds.
    })

    this._mesh = new THREE.Mesh( this._geometry, this._material );
    this._scene.add( this._mesh );

    this.array = [];
}

SVE.Scene.prototype =
{
    // Returns one dimensional array representing a
    // grid of the given size.
    // Initializes this scene to render arrays of this size.
    // rect = {x:,y:, w:, h:}
    allocate_grid(num_rows, num_columns, rect)
    {
        // Scalar array for modification by the user's mathematics.
        var output = [];
        var default_scalar = 0.0;
        var default_color  = this.scalar_to_color(default_scalar);

        // Allocate Vertices.
        for(var row = 0; row <= num_rows;    row++)
        for(var col = 0; col <= num_columns; col++)
        {
            this._geometry.vertices.push(
                new THREE.Vector3( rect.x + rect.w*col/num_columns,
                                   rect.y + rect.h*row/num_rows, 0 )
            );
        }

        var row_len = (num_columns + 1);

        // Allocate faces, 1 scalar and 2 triangles per
        // quadrilateral face.
        for(var row = 0; row < num_rows;    row++)
        for(var col = 0; col < num_columns; col++)
        {
            // scalar
            output.push(default_scalar);

            // quadrilateral corner indices.
            var i1 = row*row_len + col;
            var i2 = i1 + 1;
            var i3 = i1 + row_len;
            var i4 = i3 + 1;

            // 2 Triangles per grid quadrilateral.
            var face1 = new THREE.Face3(i1, i2, i4);
            var face2 = new THREE.Face3(i1, i4, i3);

            face1.color = this.scalar_to_color(Math.random());

            this._geometry.faces.push(face1, face2);
        }

        this.array = output;
        return output;
    },

    scalar_to_color(scalar)
    {
        val     = SVE.MathB.clamp(scalar, 0, 1.0);
        return new THREE.Color(val, val, val);
    },

    // 
    update()
    {
        var value_array = this.array;
        var len = value_array.length;

        for(var i = 0; i < len; i++)
        {
            var c = this.scalar_to_color(value_array[i]);

            var face1 = this._geometry.faces[i*2];
            var face2 = this._geometry.faces[i*2 + 1];

            face1.color = c;
            face2.color = c;
        }

        this._geometry.elementsNeedUpdate = true;
        this._geometry.colorsNeedUpdate = true;

    },

    // Uses the input THREE.js renderer to render the current scene.
    render(renderer, camera)
    {
        renderer.render( this._scene, camera);
    },
}