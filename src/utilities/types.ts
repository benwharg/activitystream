export interface SearchCell {
  Key: string;
  Value: string | number | null;
  ValueType: string;
}

export interface NewsCardProps {
  Title: string;
  Description: string;
  Path: string;
  Author: string;
  SiteName: string;
  LastModifiedTime: string;
}
