﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Controllers
{
    public class PostTagController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
