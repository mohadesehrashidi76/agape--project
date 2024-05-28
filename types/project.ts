export interface Banner {
  id: number;
  url: string;
}

export interface Category {
  name: string;
  en_name: string;
}

export interface Organization {
  name: string;
  slug: string;
  logo: string;
  category: Category;
}

export interface Project {
  id: number;
  is_vip: boolean | null;
  name: string;
  slug: string;
  subtitle: string;
  cost: number;
  balance: number;
  status: string;
  is_successful: number;
  banner: Banner[];
  organization: Organization;
}

export interface Links {
  url: string | null;
  label: string;
  active: boolean;
}

export interface FilteredProjects {
  seo: {
    id: number;
    name: string;
    translate: string;
    title: string;
    description: string;
    og: {
      type: string;
      title: string;
      description: string;
      image: string;
      url: string;
      site_name: string;
    };
    twitter: {
      title: string;
      description: string;
      image: string;
      site: string;
      creator: string;
    };
    created_at: string;
    updated_at: string;
  };
  min_cost: number;
  max_cost: number;
  current_page: number;
  data: Project[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Links[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
export interface Tab {
  label: string;
  onClick: () => void;
}

export interface TabsProps {
  tabs: Tab[];
}
export interface ICardPattern {
  title: string;
  img: string;
  subtitle: string;
  status: string;
  organizationname: string;
  logo: string;
}
