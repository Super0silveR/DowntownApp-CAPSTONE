using Application.Common.Interfaces;
using System.Drawing;

namespace Application.Services
{
    public class ColorService : IColorService
    {
        public string HexConverter(Color color) =>
            "#" + color.R.ToString("X2") +
                  color.G.ToString("X2") +
                  color.B.ToString("X2");

        public string RgbConverter(Color color) =>
            "RGB(" + color.R.ToString() + "," +
                     color.G.ToString() + "," +
                     color.B.ToString() + ")";
    }
}
