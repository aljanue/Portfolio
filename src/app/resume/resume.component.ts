import { Component } from '@angular/core';
import { TimelineSectionComponent } from '../timeline-section/timeline-section.component';
import { AboutCardComponent } from '../about-card/about-card.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [TimelineSectionComponent, AboutCardComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  title="Resume";
  selectedCategory = 'All';

  sections=[{
    id: 1,
    title:"Education",
    img: "M22 9.74l-2 1.02v7.24c-1.007 2.041-5.606 3-8.5 3-3.175 0-7.389-.994-8.5-3v-7.796l-3-1.896 12-5.308 11 6.231v8.769l1 3h-3l1-3v-8.26zm-18 1.095v6.873c.958 1.28 4.217 2.292 7.5 2.292 2.894 0 6.589-.959 7.5-2.269v-6.462l-7.923 4.039-7.077-4.473zm-1.881-2.371l9.011 5.694 9.759-4.974-8.944-5.066-9.826 4.346z",
    subsections:[
      {
        id:1,
        title:"Multimedia Engineering Degree",
        date:"2023 - NOW",
        place:"University of Valencia (SPAIN)",
      },
      {
        id:2,
        title:"Telecommunications Electronics Engineering Degree",
        date:"2019 - 2022 (Not Finished)",
        place:"University of Valencia (SPAIN)",
      },
      {
        id:3,
        title:"High School Degree",
        date:"2017 - 2019",
        place:"Colegio Salesianas - María Auxiliadora, Valencia (SPAIN)",
      }
    ]
  },
  ]
  skills = [
    {
      id: 1,
      tag: "front",
      skills: [{
        id: 1,
        name: "Angular",
        img: "",
        percentage: 60,
      },
      {
        id: 2,
        name: "HTML",
        img: "",
        percentage: 100,
      },
      {
        id: 3,
        name: "CSS",
        img: "",
        percentage: 80,
      },
      {
        id: 4,
        name: "JavaScript",
        img: "",
        percentage: 70,
      }]},
    {
      id: 2,
      tag: "back",
      skills:[
      {
        id: 5,
        name: "Django",
        img: "",
        percentage: 40,
      },
      {
        id: 6,
        name: "Springboot",
        img: "",
        percentage: 25,
      },
      {
        id: 7,
        name: "Python",
        img: "",
        percentage: 55,
      },
      {
        id: 8,
        name: "JAVA",
        img: "",
        percentage: 65,
      },
      {
        id: 9,
        name: "SQL",
        img: "",
        percentage: 90,
      },
      {
        id: 10,
        name: "PHP",
        img: "",
        percentage: 45,
      }]},
      {
        id: 3,
        tag: "design",
        skills: [
          {
            id: 13,
            name: "Figma",
            img: "",
            percentage: 80,
          },
          {
            id: 14,
            name: "Blender",
            img: "",
            percentage: 60,
          },
          {
            id: 15,
            name: "Photoshop",
            img: "",
            percentage: 65,
          },
          {
            id: 16,
            name: "Illustrator",
            img: "",
            percentage: 54,
          },
          {
            id: 17,
            name: "Lightroom",
            img: "",
            percentage: 85,
          },
          {
            id: 18,
            name: "Premiere",
            img: "",
            percentage: 70,
          }]},
    {
      id: 4,
      tag: "others",
      skills:[
        {
          id: 11,
          name: "Kotlin",
          img: "",
          percentage: 50,
        },
        {
          id: 12,
          name: "Unity",
          img: "",
          percentage: 80,
        },
        {
          id: 19,
          name: "C#",
          img: "",
          percentage: 70,
        },
        {
          id: 19,
          name: "C++",
          img: "",
          percentage: 75,
        }]}
      ];

      honours=[
        {title:"Web Application Development", description: "HTML, CSS, JS, JSP/JavaServlet & PHP. Model, View, Controller (MVC)."},
        {title: "Front-End Development", description: "HTML, CSS, JS. Three.js, D3.js, Canvas..."},
        {title: "Databases and Storage Systems", description: "Relational Model, Entity-Relationship Model, SQL Queries..."},
        {title: "Animation", description: "Development of Python Addons for Blender, Modeling, Rigging..."},
        {title: "Computer Graphics", description: "Unity. Shaders, Lighting..."},
        {title: "Structure of Computers", description: "Memory, Input / Output, Peripherals, Buses..."},
      ];

      certifications=[
        {title:"Design Thinking and Innovation", description:"Certified by: Capgemini. User interfaces and usability."},
        {title:"Testing and Continuous Integration", description:"Certified by: Capgemini. White box testing in Java."},
        {title:"Red Hat System Administration I", description:"Certified by: RedHat Academy. Administration and management of Linux systems."},
        {title:"CCNAv7: Introduction to Networks", description:"Certified by: Cisco Networking Academy. Network configuration and use of TCP/IP protocols."},
        {title:"Introduction to Artificial Intelligence", description:"Certified by: Amazon Web Services (AWS). Machine Language, Artificial Intelligence and Deep Learning."},
        {title:"Mobile Apps Development", description:"Certified by: Google. Skills and concepts for creating applications for mobile devices."},
        {title:"Fundamentals of Digital Marketing", description:"Certified by: Google. Learn the basics of digital marketing and boost your business or career."},
      ]

      ngOnInit() {
        this.skills.forEach(skillCategory => {
          skillCategory.skills.forEach(skill => {
            const desiredPercentage = skill.percentage;
            skill.percentage = 0;
    
            setTimeout(() => {
              skill.percentage = desiredPercentage;
            }, 100);
          });
        });
      }


      filterByCategory(category: string) {
  this.selectedCategory = category;

  this.skills.forEach(skillCategory => {
      skillCategory.skills.forEach(skill => {
        const desiredPercentage = skill.percentage;
        skill.percentage = 0;

        setTimeout(() => {
          skill.percentage = desiredPercentage;
        }, 500);
      });
  });
}
    
};

