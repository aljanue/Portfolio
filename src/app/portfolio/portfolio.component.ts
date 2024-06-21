import { Component } from '@angular/core';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  title="Portfolio";
  selectedCategory = 'All';
  projects=[
    {
      category: "Front-End",
      projects: [
        {
          id: 1,
          title: "CatChef",
          img: "assets/img/catchef.png",
          tags: ["HTML", "CSS", "JS"],
          url: "https://mural.uv.es/aljanue/CatChef/index.html"
        },
        {
          id: 2,
          title: "Nocuk",
          img: "assets/img/nocuk.png",
          tags: ["Angular", "Tailwind"],
          url: "https://aljanue.github.io/html/nocuk.html"
        },
        {
          id: 8,
          title: "Espe's Portfolio",
          img: "assets/img/espe.png",
          tags: ["HTML", "CSS", "JS"],
          url: "https://espemoragues.github.io/"
        },
        {
          id: 9,
          title: "Old Portfolio",
          img: "assets/img/oldportfolio.png",
          tags: ["HTML", "CSS", "JS"],
          url: "https://aljanue.github.io/"
        }
      ]
      },
      {
        category: "Full-Stack",
        projects: [{
          id: 3,
          title: "Snakers",
          img: "assets/img/snakers.png",
          tags: ["HTML", "CSS", "JS", "Java Servlet + JSP", "SQL", "PHP"],
          url: "https://aljanue.github.io/html/snakers.html"
        }]
      },
      {
        category: "Addons",
        projects: [{
          id: 4,
          title: "Lighting",
          img: "assets/img/lighting.png",
          tags: ["Blender", "Python"],
          url: "https://github.com/aljanue/3-points-lighting"
        },
        {
          id: 5,
          title: "Procedural City",
          img: "assets/img/city.png",
          tags: ["Blender", "Python"],
          url: "https://github.com/aljanue/Procedural-City-Blender-Addon"
        },
        {
          id: 6,
          title: "CSV - BVH Converter",
          img: "assets/img/converter.png",
          tags: ["Blender", "Python"],
          url: "https://github.com/aljanue/CsvToBvh-Converter"
        },
        {
          id: 7,
          title: "Curve Filter",
          img: "assets/img/curves.png",
          tags: ["Blender", "Python"],
          url: "https://github.com/aljanue/MOCAP-Filter"
        }
      ]
      }
    ];

    filterByCategory(category: string) {
      this.selectedCategory = category;
    }
}
