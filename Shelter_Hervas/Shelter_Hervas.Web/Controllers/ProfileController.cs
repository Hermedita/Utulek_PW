using Microsoft.AspNetCore.Mvc;

namespace Shelter_Hervas.Web.Controllers;

public class ProfileController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}