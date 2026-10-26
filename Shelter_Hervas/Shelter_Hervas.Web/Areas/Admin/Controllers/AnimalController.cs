namespace Shelter_Hervas.Web.Areas.Admin.Controllers;
using Microsoft.AspNetCore.Mvc;

[Area(nameof(Admin))]
public class AnimalController : Controller
{
    
    public IActionResult Index()
    {
        return View();
    }
    
}