/*
 * Extra Simple Math functions.
 */

SVE.MathB = {};

SVE.MathB.clamp = function(val, min, max)
{
    return Math.min(max, Math.max(val, min));
}

// Solves Ax = c for x using Gauss-Seidel relaxation.
// 
SVE.MathB.lin_solve(X_out, X_in, A, C, N)
{
   ITERATIONS = 20;
   for(var n = 0; n < ITERATIONS; n++)
   {
     for(var row = 1; row <= N; row++)
     for(var col = 1; col <= N; col++)
     {
        X_out[IX(row, col)] =   (x0[IX(row, col, N)]      +
                          a*( x[IX(row, col - 1, N)]  +
                              x[IX(row, col + 1, N)]  +
                              x[IX(row - 1, col, N)]  +
                              x[IX(row + 1, col, N)])
                             )/C;
     }
     set_bnd(b, x);
   }
}