# upSqool Architecture & Agent Rules

These rules dictate the strict architecture, modularity, and design conventions that govern the development of the upSqool codebase. AI Agents and developers must adhere to these directives.

## 1. Modular Component Architecture
To ensure readability, maintainability, and optimized rendering loops, complex screens must not be housed in a single massive file.
- **Sub-Component Offloading**: Every primary screen located in `src/components/pages/` must isolate and extract significant UI chunks into an explicitly adjacent `components/` sub-directory (e.g., `src/components/pages/CalendarScreen/components/ActivityCard.js`).
- **Master Screen Concept**: The Root Screen file (e.g., `CalendarScreen.js`) must exist strictly as a top-level **State Manager**. It should handle reactive state hooks, data simulation/fetching, and calculation logic, passing localized data downward into its nested UI sub-components via standard React props.

## 2. Design System & Aesthetics
- **Mindful Archivist Styling**: Follow the project's premium, airy layout aesthetics. Avoid generic layouts.
- **No Harsh Borders**: Absolutely **no 1px solid borders** (`borderWidth: 1`) should be used to demarcate standard list cards or modules. Separation of elements must rely heavily on background tonal contrasts (like pastel element bounding boxes over white) and deep, ultra-soft shadows (`elevation`, `shadowOpacity < 0.05`, `shadowRadius: 16+`).
- **Global Typography Component**: You cannot use React Native's default `<Text>`. You must strictly import and leverage the internal design system's customized text component: `import CustomText from '../../UI/Text/Text'` (calculate the relative path based on your current import directory). Do not manipulate core React Native styling fonts directly; rely on `CustomText` variants (e.g., `variant="headline"`, `weight="bold"`).
- **Global Colors**: Always import and use the centralized Token map: `import { Colors } from '../../../styles/colors'`. Never hardcode raw hex values outside of highly localized and highly specific gradient logic or random procedural UI data mappings.

## 3. Data Mocking & Fallbacks
- **Empty States**: You must always anticipate an empty database fetch. If creating a dashboard or list view, ensure you program a gorgeous, interactive "Empty State" component providing adequate UI feedback and a prominent Call To Action (CTA).
- **Procedural Simulation**: When mocking data to build the UI, try to build deterministic/procedural mocking functions (e.g., based on mathematical day checks or object configurations) so the layout feels dynamic and interactive while the backend is pending, rather than a globally hardcoded static array.

## 4. UI Library Mapping
- **Icons**: Directly rely on `@expo/vector-icons` using the `<Ionicons />` library. Ensure icon color palettes align flawlessly with the component's surrounding UI.
- **Inputs**: Text inputs globally must utilize the refactored `CustomInput` component located in `src/components/UI/Input/Input.js` to safeguard uniformity.
