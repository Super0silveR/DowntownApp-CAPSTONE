using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Options
{
    public class JwtSettings
    {
        public string? Secret { get; set; }
        public TimeSpan TokenLifetime { get; set; }
    }
}
