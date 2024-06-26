import * as Joi from 'joi';
import {
  ONE_WORD_ALLOWED_VALIDATION_MESSAGE,
  ONE_WORD_REG_EX,
  PostAnnouncementConstraints,
  PostQuoteAuthorConstraints,
  PostQuoteTextConstraints,
  PostTagConstraints,
  PostTextConstraints,
  PostTitleConstraints,
} from './post.constraints';
import { PostType } from '@project/core';
import { PostRefDescriptionConstraints } from './post.constraints';

export const CreatePostValidator = Joi.object({
  type: Joi.string()
    .valid(...Object.values(PostType))
    .required(),
  tags: Joi.array()
    .max(PostTagConstraints.length)
    .unique()
    .items(
      Joi.string()
        .min(PostTagConstraints.Min)
        .max(PostTagConstraints.Max)
        .regex(ONE_WORD_REG_EX, { name: ONE_WORD_ALLOWED_VALIDATION_MESSAGE })
    ),
  title: Joi.when('type', [
    {
      is: PostType.Text,
      then: Joi.string()
        .required()
        .min(PostTitleConstraints.Min)
        .max(PostTitleConstraints.Max),
    },
    {
      is: PostType.Video,
      then: Joi.string()
        .required()
        .min(PostTitleConstraints.Min)
        .max(PostTitleConstraints.Max),
    },
  ]),
  text: Joi.when('type', [
    {
      is: PostType.Text,
      then: Joi.string()
        .required()
        .min(PostTextConstraints.Min)
        .max(PostTextConstraints.Max),
    },
    {
      is: PostType.Quote,
      then: Joi.string()
        .required()
        .min(PostQuoteTextConstraints.Min)
        .max(PostQuoteTextConstraints.Max),
    },
  ]),
  announcement: Joi.when('type', {
    is: PostType.Text,
    then: Joi.string()
      .required()
      .min(PostAnnouncementConstraints.Min)
      .max(PostAnnouncementConstraints.Max),
  }),
  quoteAuthor: Joi.when('type', {
    is: PostType.Quote,
    then: Joi.string()
      .required()
      .min(PostQuoteAuthorConstraints.Min)
      .max(PostQuoteAuthorConstraints.Max),
  }),
  url: Joi.when('type', [
    {
      is: PostType.Video,
      then: Joi.string().required(),
    },
    {
      is: PostType.Ref,
      then: Joi.string().required(),
    },
  ]),

  photoId: Joi.when('type', [
    {
      is: PostType.Photo,
      then: Joi.string().required(),
    },
  ]),
  description: Joi.when('type', [
    {
      is: PostType.Ref,
      then: Joi.string().max(PostRefDescriptionConstraints.Max),
    },
  ]),
}).options({
  abortEarly: false,
});
