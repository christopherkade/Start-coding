export class Documentation {
  URL: string;
  level: number;
  name: string;
  tech: string;
  type: string;
  description: string;

  constructor(url, level, name, tech, type, description) {
    this.URL = url;
    this.level = level;
    this.name = name;
    this.tech = tech;
    this.type = type;
    this.description = description;
  }
}
