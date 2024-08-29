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
    title:"Education",
    img: "M22 9.74l-2 1.02v7.24c-1.007 2.041-5.606 3-8.5 3-3.175 0-7.389-.994-8.5-3v-7.796l-3-1.896 12-5.308 11 6.231v8.769l1 3h-3l1-3v-8.26zm-18 1.095v6.873c.958 1.28 4.217 2.292 7.5 2.292 2.894 0 6.589-.959 7.5-2.269v-6.462l-7.923 4.039-7.077-4.473zm-1.881-2.371l9.011 5.694 9.759-4.974-8.944-5.066-9.826 4.346z",
    subsections:[
      {
        title:"Multimedia Engineering Degree",
        date:"2022 - NOW",
        place:"University of Valencia (SPAIN)",
      },
      {
        title:"Telecommunications Electronics Engineering Degree",
        date:"2019 - 2022",
        place:"University of Valencia (SPAIN)",
      },
      {
        title:"High School Degree",
        date:"2017 - 2019",
        place:"Colegio Salesianas - María Auxiliadora, Valencia (SPAIN)",
      }
    ]
  },
  {
    title:"Experience",
    img: "M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6.001-12.5c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z",
    subsections:[
      {
        title:"Product Owner",
        date: "July 2024 - NOW",
        place:"Dots. Memories ",
      }
    ]
  }]
  skills = [
    {
      tag: "front",
      skills: [{
        name: "Angular",
        img: "",
        percentage: 60,
      },
      {
        name: "HTML",
        img: "",
        percentage: 100,
      },
      {
        name: "CSS",
        img: "",
        percentage: 80,
      },
      {
        name: "JavaScript",
        img: "",
        percentage: 70,
      }]},
    {
      tag: "back",
      skills:[
      {
        name: "Django",
        img: "",
        percentage: 20,
      },
      {
        name: "Springboot",
        img: "",
        percentage: 25,
      },
      {
        name: "Python",
        img: "",
        percentage: 55,
      },
      {
        name: "JAVA",
        img: "",
        percentage: 65,
      },
      {
        name: "SQL",
        img: "",
        percentage: 90,
      },
      {
        name: "PHP",
        img: "",
        percentage: 45,
      }]},
      {
        tag: "design",
        skills: [
          {
            name: "Figma",
            img: "",
            percentage: 80,
          },
          {
            name: "Blender",
            img: "",
            percentage: 60,
          },
          {
            name: "Photoshop",
            img: "",
            percentage: 65,
          },
          {
            name: "Illustrator",
            img: "",
            percentage: 54,
          },
          {
            name: "Lightroom",
            img: "",
            percentage: 85,
          },
          {
            name: "Premiere",
            img: "",
            percentage: 70,
          }]},
    {
      tag: "others",
      skills:[
        {
          name: "Kotlin",
          img: "",
          percentage: 50,
        },
        {
          name: "Unity",
          img: "",
          percentage: 80,
        },
        {
          name: "C#",
          img: "",
          percentage: 70,
        },
        {
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
        {title:"Project Management and Agile Methodology Fundamentals", description:"Certified by: Santander. Learn about project management and the Agile methodology to apply it to your work environment."},
        {title:"Design Thinking and Innovation", description:"Certified by: Capgemini. User interfaces and usability."},
        {title:"Testing and Continuous Integration", description:"Certified by: Capgemini. White box testing in Java."},
        {title:"Red Hat System Administration I", description:"Certified by: RedHat Academy. Administration and management of Linux systems."},
        {title:"CCNAv7: Introduction to Networks", description:"Certified by: Cisco Networking Academy. Network configuration and use of TCP/IP protocols."},
        {title:"Introduction to Artificial Intelligence", description:"Certified by: Amazon Web Services (AWS). Machine Language, Artificial Intelligence and Deep Learning."},
        {title:"Mobile Apps Development", description:"Certified by: Google. Skills and concepts for creating applications for mobile devices."},
        {title:"Fundamentals of Digital Marketing", description:"Certified by: Google. Learn the basics of digital marketing and boost your business or career."},
        {title:"Effective Communication", description:"Certified by: Santander. Learn the keys to effective communication and apply them in your day-to-day work."},
        {title:"Leadership", description:"Certified by: Santander. Explore the key skills, strategies and mindsets needed to excel in leadership roles."}
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

