using Microsoft.AspNetCore.Mvc;

namespace Shelter_Hervas.Web.Controllers;

public class AccountController : Controller
{
    public IActionResult Login() => View();
}