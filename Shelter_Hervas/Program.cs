using Microsoft.EntityFrameworkCore;
using Shelter_Hervas.Infrastructure.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

//SQL
var connectionString = builder.Configuration.GetConnectionString("MySQL");
var serverVersion = ServerVersion.AutoDetect(connectionString);
builder.Services.AddDbContext<ShelterDbContext>(optionBuilder => optionBuilder.UseMySql(connectionString, serverVersion));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();