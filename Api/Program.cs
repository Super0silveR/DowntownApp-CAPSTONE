using Amazon.S3;
using Api.Installers.Extensions;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager _config = builder.Configuration;

// Add services to the container.
builder.Services.InstallServicesInAssembly(_config);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding AWS configuration
var AWSoptions = _config.GetAWSOptions();

builder.Services.AddDefaultAWSOptions(AWSoptions);
//builder.Services.AddAWSService<IAmazonS3>(); /// S3 Bucket for file/bucket actions.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
