using Microsoft.AspNetCore.Mvc;

namespace Shelter_Hervas.Web.Controllers;

public class AnimalController : Controller
{
    public IActionResult Index() => View();

    public IActionResult Details(int id)
    {
        ViewBag.AnimalId = id;
        return View();
    }
}