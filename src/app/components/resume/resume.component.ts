import { Component } from '@angular/core';
import { TimelineSectionComponent } from '../timeline-section/timeline-section.component';
import { AboutCardComponent } from '../about-card/about-card.component';
import { Education } from '../../models/education';
import { Experience } from '../../models/experience';
import { ContentfulService } from '../../services/contentful.service';
import { forkJoin } from 'rxjs';
import { Skill } from '../../models/skill';
import { Honour } from '../../models/honour';
import { Certification } from '../../models/certification';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [TimelineSectionComponent, AboutCardComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  title = 'Resume';
  selectedCategory = 'All';

  education: Education = {
    title: 'Education',
    img: 'M22 9.74l-2 1.02v7.24c-1.007 2.041-5.606 3-8.5 3-3.175 0-7.389-.994-8.5-3v-7.796l-3-1.896 12-5.308 11 6.231v8.769l1 3h-3l1-3v-8.26zm-18 1.095v6.873c.958 1.28 4.217 2.292 7.5 2.292 2.894 0 6.589-.959 7.5-2.269v-6.462l-7.923 4.039-7.077-4.473zm-1.881-2.371l9.011 5.694 9.759-4.974-8.944-5.066-9.826 4.346z',
    educations: []
  };
  experience: Experience = {
    title: 'Experience',
    img: 'M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6.001-12.5c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z',
    experiences: []
  };

  skills: Skill[] = [];
  tags: string[] = [];
  groupedSkills: { tag: string; skills: Skill[] }[] = [];

  honours: Honour[] = [];

  certifications: Certification[] = [];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    forkJoin({
      education: this.contentfulService.getEducation(),
      experience: this.contentfulService.getExperience(),
      skills: this.contentfulService.getSkills(),
      honours: this.contentfulService.getHonours(),
      certifications: this.contentfulService.getCertifications()
    }).subscribe(({ education, experience, skills, honours, certifications }) => {
      this.loadEducationData(education);
      this.loadExperienceData(experience);

      this.loadSkillsData(skills);
      this.loadSkillTags();
      this.groupSkillsByTag();

      this.loadHonoursData(honours);

      this.loadCertificationsData(certifications)
    });
  }

  private loadEducationData(educationData: any) {
    educationData.map((edu: any) => {
        this.education.educations.push({
          degree: edu.fields.degree,
          school: edu.fields.school,
          initDate: new Date(edu.fields.initDate),
          endDate: edu.fields.endDate ? new Date(edu.fields.endDate) : undefined,
          country: edu.fields.country,
        });
    });

    this.sortByEndDate(this.education.educations);
  }

  private loadExperienceData(experienceData: any) {
    experienceData.map((exp: any) => {
        this.experience.experiences.push({
          role: exp.fields.role,
          company: exp.fields.company,
          initDate: new Date(exp.fields.initDate),
          endDate: exp.fields.endDate ? new Date(exp.fields.endDate) : undefined,
          description: exp.fields.description,
        });
    });
    this.sortByEndDate(this.experience.experiences);
  }

  private loadSkillsData(skillsData: any) {
    skillsData.map((skill: any) => {
      this.skills.push({
        name: skill.fields.name,
        percentage: skill.fields.percentage,
        tag: skill.fields.category,
      })
    });
  }

  private loadHonoursData(honoursData: any) {
    honoursData.map((honour: any) => {
      this.honours.push({
        title: honour.fields.subject,
        description: honour.fields.description,
      })
    })
  }

  private loadCertificationsData(certificationsData: any) {
    certificationsData.map((certification: any) => {
      this.certifications.push({
        title: certification.fields.title,
        description: certification.fields.description,
        entity: certification.fields.certificationEntity,
        date: new Date(certification.fields.date),
      })
    });
    this.certifications.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      return dateB.getTime() - dateA.getTime();
    });
  }


  private loadSkillTags() {
    const uniqueTags = new Set<string>();
    this.skills.forEach((skill) => {
      uniqueTags.add(skill.tag);
    });
    const tagOrder = ['front', 'back', 'design'];
    const tagsArray = Array.from(uniqueTags);
    
    this.tags = tagsArray.sort((a, b) => {
      if (a === 'others') return 1;
      if (b === 'others') return -1;
      
      const indexA = tagOrder.indexOf(a);
      const indexB = tagOrder.indexOf(b);
      
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
  }

  private groupSkillsByTag() {
    this.groupedSkills = [];
    this.tags.forEach((tag) => {
      const skillsInTag = this.skills
        .filter((skill) => skill.tag === tag)
        .sort((a, b) => a.name.localeCompare(b.name));
      this.groupedSkills.push({ tag, skills: skillsInTag });
    });
  }

  private sortByEndDate<T extends { endDate?: Date }>(items: T[]) {
      items.sort((a, b) => {
        const endDateA = a.endDate ? a.endDate : new Date();
        const endDateB = b.endDate ? b.endDate : new Date();
        return endDateB.getTime() - endDateA.getTime();
      });
    }


  filterByCategory(category: string) {
    this.selectedCategory = category;

    this.groupedSkills.forEach((skillCategory) => {
      skillCategory.skills.forEach((skill) => {
        const desiredPercentage = skill.percentage;
        skill.percentage = 0;

        setTimeout(() => {
          skill.percentage = desiredPercentage;
        }, 500);
      });
    });
  }
}
