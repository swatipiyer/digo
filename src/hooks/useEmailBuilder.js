import { useReducer, useCallback } from 'react';
import { TEMPLATE_VARIANTS, COLOR_PRESETS } from '../data/emailTemplateVariants';

const DEFAULT_SECTIONS = {
  heroImage: false,
  header: true,
  subheading: true,
  bodyText: true,
  inlineImage: false,
  divider: true,
  cta: true,
  socialLinks: false,
  footer: true,
};

const DEFAULT_DESIGN = {
  colors: { ...COLOR_PRESETS[0].colors },
  typography: {
    fontFamily: 'system',
    headingSize: 28,
    bodySize: 16,
    textAlign: 'center',
  },
  spacing: {
    contentPadding: 40,
    sectionGap: 24,
  },
  borderRadius: 8,
  layout: 'single-column',
  headerStyle: 'solid-color',
  ctaStyle: 'rounded',
  footerStyle: 'minimal',
};

export const initialEmailState = {
  templateCategory: 'announcement',
  templateVariant: 'announcement-classic',
  content: {
    heading: '',
    subheading: '',
    body: '',
    ctaText: 'Register Now',
    ctaUrl: '',
  },
  subject: '',
  sections: { ...DEFAULT_SECTIONS },
  images: {
    hero: '',
    inline: '',
    background: '',
  },
  design: { ...DEFAULT_DESIGN },
  branding: {
    organizationName: '',
  },
  customSections: [],
};

function emailReducer(state, action) {
  switch (action.type) {
    case 'SET_TEMPLATE': {
      const category = TEMPLATE_VARIANTS[action.category];
      const variant = category.variants.find(v => v.id === action.variantId) || category.variants[0];
      return {
        ...state,
        templateCategory: action.category,
        templateVariant: variant.id,
        content: { ...category.defaultContent },
        subject: category.defaultSubject || '',
        sections: { ...variant.defaultSections },
        images: { hero: '', inline: '', background: '' },
        design: {
          ...state.design,
          headerStyle: variant.defaultDesign.headerStyle,
          ctaStyle: variant.defaultDesign.ctaStyle,
          footerStyle: variant.defaultDesign.footerStyle,
          layout: variant.defaultDesign.bodyLayout,
        },
      };
    }
    case 'SET_VARIANT': {
      const category = TEMPLATE_VARIANTS[state.templateCategory];
      const variant = category.variants.find(v => v.id === action.variantId);
      if (!variant) return state;
      return {
        ...state,
        templateVariant: variant.id,
        sections: { ...variant.defaultSections },
        design: {
          ...state.design,
          headerStyle: variant.defaultDesign.headerStyle,
          ctaStyle: variant.defaultDesign.ctaStyle,
          footerStyle: variant.defaultDesign.footerStyle,
          layout: variant.defaultDesign.bodyLayout,
        },
      };
    }
    case 'UPDATE_CONTENT':
      return { ...state, content: { ...state.content, ...action.payload } };
    case 'UPDATE_SUBJECT':
      return { ...state, subject: action.payload };
    case 'TOGGLE_SECTION':
      return { ...state, sections: { ...state.sections, [action.section]: !state.sections[action.section] } };
    case 'UPDATE_IMAGE':
      return { ...state, images: { ...state.images, [action.slot]: action.value } };
    case 'UPDATE_COLOR':
      return { ...state, design: { ...state.design, colors: { ...state.design.colors, [action.key]: action.value } } };
    case 'SET_COLOR_PRESET':
      return { ...state, design: { ...state.design, colors: { ...action.colors } } };
    case 'UPDATE_TYPOGRAPHY':
      return { ...state, design: { ...state.design, typography: { ...state.design.typography, ...action.payload } } };
    case 'UPDATE_SPACING':
      return { ...state, design: { ...state.design, spacing: { ...state.design.spacing, ...action.payload } } };
    case 'UPDATE_BORDER_RADIUS':
      return { ...state, design: { ...state.design, borderRadius: action.value } };
    case 'UPDATE_LAYOUT':
      return { ...state, design: { ...state.design, layout: action.value } };
    case 'UPDATE_HEADER_STYLE':
      return { ...state, design: { ...state.design, headerStyle: action.value } };
    case 'UPDATE_CTA_STYLE':
      return { ...state, design: { ...state.design, ctaStyle: action.value } };
    case 'UPDATE_BRANDING':
      return { ...state, branding: { ...state.branding, ...action.payload } };
    case 'ADD_CUSTOM_SECTION':
      return {
        ...state,
        customSections: [
          ...(state.customSections || []),
          { id: Date.now(), type: action.sectionType, title: action.title, content: '' },
        ],
      };
    case 'UPDATE_CUSTOM_SECTION':
      return {
        ...state,
        customSections: (state.customSections || []).map(s =>
          s.id === action.payload.id ? { ...s, content: action.payload.content } : s
        ),
      };
    case 'REMOVE_CUSTOM_SECTION':
      return {
        ...state,
        customSections: (state.customSections || []).filter(s => s.id !== action.payload),
      };
    case 'REORDER_CUSTOM_SECTION': {
      const list = [...(state.customSections || [])];
      const idx = list.findIndex(s => s.id === action.payload.id);
      if (idx === -1) return state;
      const newIdx = action.payload.direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= list.length) return state;
      [list[idx], list[newIdx]] = [list[newIdx], list[idx]];
      return { ...state, customSections: list };
    }
    case 'LOAD_SAVED':
      return { ...action.payload };
    default:
      return state;
  }
}

function migrateOldTemplate(old) {
  return {
    ...initialEmailState,
    templateCategory: old.baseTemplate || 'announcement',
    templateVariant: `${old.baseTemplate || 'announcement'}-classic`,
    content: old.content || initialEmailState.content,
    subject: old.subject || '',
    images: {
      hero: old.headerImage || '',
      inline: old.bodyImage || '',
      background: '',
    },
    design: {
      ...DEFAULT_DESIGN,
      colors: {
        ...COLOR_PRESETS[0].colors,
        primary: old.brandColor || '#1f2937',
        headerBackground: old.brandColor || '#1f2937',
        accent: old.brandColor || '#2563eb',
      },
    },
    branding: { organizationName: old.organizationName || '' },
  };
}

const STORAGE_KEY = 'digo_saved_email_templates_v2';
const OLD_STORAGE_KEY = 'digo_saved_email_templates';

export function useEmailBuilder() {
  const [state, dispatch] = useReducer(emailReducer, initialEmailState);

  const saveTemplate = useCallback((name) => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const template = {
      id: Date.now(),
      name,
      state: { ...state },
      createdAt: new Date().toISOString(),
    };
    saved.push(template);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    return template;
  }, [state]);

  const loadTemplate = useCallback((template) => {
    if (template.state) {
      dispatch({ type: 'LOAD_SAVED', payload: template.state });
    } else {
      dispatch({ type: 'LOAD_SAVED', payload: migrateOldTemplate(template) });
    }
  }, []);

  const deleteTemplate = useCallback((id) => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updated = saved.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const getSavedTemplates = useCallback(() => {
    const v2 = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const old = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY) || '[]');
    return [...v2, ...old.map(t => ({ ...t, isLegacy: true }))];
  }, []);

  return [state, dispatch, { saveTemplate, loadTemplate, deleteTemplate, getSavedTemplates }];
}
