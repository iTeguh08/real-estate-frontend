/** Media slots mirroring Nova Property MediaImage fields. */

export type CustomLayout = 'layout-1' | 'layout-2';

export type MediaSlotField =
  | 'image_url'
  | 'layout1_showcase_one_url'
  | 'layout1_showcase_two_url'
  | 'layout1_showcase_three_url'
  | 'layout1_feature_vertical_url'
  | 'layout1_feature_square_url'
  | 'layout1_banner_url'
  | 'layout2_split_vertical_url'
  | 'layout2_split_landscape_url'
  | 'layout2_banner_url';

export interface MediaSlotMeta {
  field: MediaSlotField;
  label: string;
  help: string;
  layout: CustomLayout | null;
}

export const COVER_MEDIA_SLOT: MediaSlotMeta = {
  field: 'image_url',
  label: 'Cover image',
  help: 'Primary photo for cards and listing hero. Landscape 16:9 recommended. Unsplash is only used on the public site if you have not uploaded yet.',
  layout: null,
};

export const LAYOUT1_MEDIA_SLOTS: MediaSlotMeta[] = [
  {
    field: 'layout1_showcase_one_url',
    label: 'Hero showcase 1',
    help: 'First of 3 thumbnails below the hero. Ratio 4:3.',
    layout: 'layout-1',
  },
  {
    field: 'layout1_showcase_two_url',
    label: 'Hero showcase 2',
    help: 'Second thumbnail below the hero. Ratio 4:3.',
    layout: 'layout-1',
  },
  {
    field: 'layout1_showcase_three_url',
    label: 'Hero showcase 3',
    help: 'Third thumbnail below the hero. Ratio 4:3.',
    layout: 'layout-1',
  },
  {
    field: 'layout1_feature_vertical_url',
    label: 'Feature — vertical',
    help: 'Left/back Interior & Lifestyle image. Ratio 3:4.',
    layout: 'layout-1',
  },
  {
    field: 'layout1_feature_square_url',
    label: 'Feature — square overlap',
    help: 'Front overlapping image. Ratio 1:1 or 4:5.',
    layout: 'layout-1',
  },
  {
    field: 'layout1_banner_url',
    label: 'Banner',
    help: 'Key Highlights / CTA banner. Ratio 4:3.',
    layout: 'layout-1',
  },
];

export const LAYOUT2_MEDIA_SLOTS: MediaSlotMeta[] = [
  {
    field: 'layout2_split_vertical_url',
    label: 'Split — vertical',
    help: 'Top-left split showcase. Ratio 3:4.',
    layout: 'layout-2',
  },
  {
    field: 'layout2_split_landscape_url',
    label: 'Split — landscape',
    help: 'Bottom-right split showcase. Ratio 16:9.',
    layout: 'layout-2',
  },
  {
    field: 'layout2_banner_url',
    label: 'Banner',
    help: 'Highlights / CTA banner. Ratio 16:9.',
    layout: 'layout-2',
  },
];

export const CUSTOM_LAYOUT_OPTIONS: { value: CustomLayout; label: string }[] = [
  { value: 'layout-1', label: 'Layout 1 — Classic showcase' },
  { value: 'layout-2', label: 'Layout 2 — Villa / editorial' },
];
