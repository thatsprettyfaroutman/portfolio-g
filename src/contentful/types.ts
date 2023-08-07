import { Asset } from 'contentful'
import { DeepReplace } from '@/types/util'
import {
  type IWork,
  type IWorkFields,
  type IClient,
  type IClientFields,
  type ITech,
  type ITechFields,
  type IImpact,
  type IImpactFields,
  type IAuthor,
  type IAuthorFields,
  type IIntro,
  type IIntroFields,
} from './types.generated'

// Fix autogenerated contentful types

export type TAsset = {
  url: string
}

export type TWork = DeepReplace<IWork & IWorkFields, Asset, TAsset>
export type TClient = DeepReplace<IClient & IClientFields, Asset, TAsset>
export type TTech = DeepReplace<ITech & ITechFields, Asset, TAsset>
export type TImpact = DeepReplace<IImpact & IImpactFields, Asset, TAsset>
export type TAuthor = DeepReplace<IAuthor & IAuthorFields, Asset, TAsset>

export type TWorkItem = TWork & {
  client: TClient
  techs: TTech[]
  impacts: TImpact[]
}

export type TIntroSection = DeepReplace<
  IIntro & IIntroFields,
  Asset,
  TAsset
> & { author: TAuthor }
