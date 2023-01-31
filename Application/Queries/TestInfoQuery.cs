using Application.Responses;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries
{
    public class TestInfoQuery : IRequest<TestResponse>
    {
        public string? TestId { get; set; }
    }
}
