import { BrandObject, DualBrandSelectElement } from '../../../Card/types';
/**
 * Creates an object used for setting state - that will trigger the rendering of a select element to allow a choice between 2 different card variants
 * @param brandObjArr - array containing 2 card brands objects
 */
export default function createCardVariantSwitcher(brandObjArr: BrandObject[]): {
    dualBrandSelectElements: DualBrandSelectElement[];
    selectedBrandValue: string;
    leadBrand: BrandObject;
};
