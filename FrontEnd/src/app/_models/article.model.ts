export class Article {
  _id: string;
  title: string;
  tags: string;
  content: string;
  creatorId: string;
  creatorName: string;
  date: string;
  image: any;

  constructor({
    _id,
    title,
    tags,
    content,
    creatorId,
    creatorName,
    date,
    image
  }: {
    _id?: string;
    title: string;
    tags: string;
    content: string;
    creatorId: string,
    creatorName: string;
    date?: string;
    image: any;
  }) {
    this._id = _id;
    this.title = title;
    this.tags = tags;
    this.content = content;
    this.creatorId = creatorId;
    this.creatorName = creatorName;
    this.date = date;
    this.image = image;
  }
}
