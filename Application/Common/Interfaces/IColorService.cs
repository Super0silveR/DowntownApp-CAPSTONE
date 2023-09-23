using System.Drawing;

namespace Application.Common.Interfaces
{
    /// <summary>
    /// Service created for colors related manipulations.
    /// </summary>
    public interface IColorService
    {
        string HexConverter(Color color);
        string RgbConverter(Color color);
    }
}
