using Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Responses
{
    public class TestResponse : BaseResponse
    {
        public string? TestId { get; set; }
        public string? TestName { get; set; }
    }
}
