 
using MediatR;
using API.Middleware;
using Application.Interfaces;
using Application.Image;
using Tensorflow.Keras.Engine;
using Microsoft.Extensions.ML;
using MLDiabetesService;
using Application.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:19006", "http://10.103.0.15", "http://a1.coms.kru.ac.th");
    });
});

builder.Services.AddScoped<IUploadFileAccessor, UploadFileAccessor>();   
builder.Services.AddScoped<IDiabetesAccessor, DiabetesAccessor>();

builder.Services.AddMediatR(typeof(UploadOne.Command).Assembly);

builder.Services.AddPredictionEnginePool<MLDiabetes.ModelInput, MLDiabetes.ModelOutput>().FromFile("MLDiabetes.zip");

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("CorsPolicy");

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
