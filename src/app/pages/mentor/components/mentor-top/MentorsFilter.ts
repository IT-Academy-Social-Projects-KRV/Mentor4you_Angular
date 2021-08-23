export class MentorsFilter {
  public category?: any[];
  public city?: any[];
  public language?: any[];
  public minValue?: number;
  public maxValue?: number;

  constructor(
    _category: any[],
    _city: any[],
    _language: any[],
    _minValue: number,
    _maxValue: number)
  {
    this.category = _category;
    this.city = _city;
    this.language = _language;
    this.minValue = _minValue;
    this.maxValue = _maxValue;
  }
}
