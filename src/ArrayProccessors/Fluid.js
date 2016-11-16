/*
 * Fluid Simulator.
 * Written by Bryce Summers on 10/3/2016.
 */

// In comes an array representing a discretization of the density
// values of a fluid submerged within a containing fluid.
SVE.Fluid = function(array, rows, columns)
{
   this.density     = array;
   this.num_rows    = rows;
   this.num_columns = columns;
}

 SVE.Fluid.prototype =
 {
    update()
    {
        for()
    },

    // Adds a fluid at the specified x any y coordinates in
    // [0, 1] x [0, 1] space.
    add_fluid(x, y)
    {
        x = SVE.MathB.clamp(x, 0.0, 1.0);
        y = SVE.MathB.clamp(y, 0.0, 1.0);

        var row = Math.floor(y*this.num_rows);
        var col = Math.floor(x*this.num_columns);

        this.density[this.ID(row, col)] = 1;

    },

    ID(row, column)
    {
        return row*this.num_columns + column;
    }

 }