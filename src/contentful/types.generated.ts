// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'

export interface IAuthorFields {
  /** Name */
  name: string

  /** Bio */
  bio: string

  /** Photo */
  photo: Asset
}

export interface IAuthor extends Entry<IAuthorFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'author'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IClientFields {
  /** Name */
  name: string

  /** Logo Map */
  logoMap: Asset
}

export interface IClient extends Entry<IClientFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'client'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IImpactFields {
  /** Body */
  body: string
}

export interface IImpact extends Entry<IImpactFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'impact'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IIntroFields {
  /** Title */
  title: string

  /** Body */
  body: string

  /** Author */
  author: IAuthor
}

export interface IIntro extends Entry<IIntroFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'intro'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ITechFields {
  /** Name */
  name: string

  /** Icon */
  icon: Asset
}

export interface ITech extends Entry<ITechFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'tech'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IWorkFields {
  /** Title */
  title: string

  /** Alt Title */
  altTitle?: string | undefined

  /** Start Date */
  startDate?: string | undefined

  /** End Date */
  endDate?: string | undefined

  /** Client */
  client: IClient

  /** Card Video */
  cardVideo: Asset

  /** Tldr */
  tldr: string

  /** Techs */
  techs?: ITech[] | undefined

  /** Impacts */
  impacts?: IImpact[] | undefined
}

export interface IWork extends Entry<IWorkFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'work'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE =
  | 'author'
  | 'client'
  | 'impact'
  | 'intro'
  | 'tech'
  | 'work'

export type IEntry = IAuthor | IClient | IImpact | IIntro | ITech | IWork

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
