declare type NotionProperties =
  | "rich_text"
  | "select"
  | "status"
  | "multi_select"
  | "title"
  | "date"
  | "people"
  | "files"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
  | "formula"
  | "relation"
  | "created_time"
  | "created_by"
  | "last_edited_time"
  | "last_edited_by";

declare type NotionPropertyValue = {
  value: string | number | boolean | null;
  rich_text: string;
  multi_select: Array<Record<string, string | null | number | boolean>>;
  start: string;
};
