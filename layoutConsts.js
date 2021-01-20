import { Dimensions } from 'react-native';


export const { width, height } = Dimensions.get('window');

//----------------------------------------------------------------
// HOME SCREEN CONSTS

export const NAV_BAR_HEIGHT = height / 10;

export const ANIMAL_POSITION_BOTTOM = NAV_BAR_HEIGHT * 3 / 2

export const ANIMAL_HEIGHT = height * 7 / 20;

export const HOME_TOP_BAR_POSITION_TOP = height / 20;

export const HOME_TOP_BAR_HEIGHT = height / 35;

export const CONSUMABLES_BAR_WIDTH = width / 4;

const HOME_SCREEN_FEATURE_VERTICAL_MARGIN = height / 40;

export const ANIMAL_VITALS_WINDOW_POSITION_TOP =
    HOME_TOP_BAR_POSITION_TOP +
    HOME_TOP_BAR_HEIGHT +
    HOME_SCREEN_FEATURE_VERTICAL_MARGIN;

export const ANIMAL_VITALS_WINDOW_HEIGHT = height / 8;

export const INVENTORY_POSITION_TOP = ANIMAL_VITALS_WINDOW_POSITION_TOP +
    ANIMAL_VITALS_WINDOW_HEIGHT +
    HOME_SCREEN_FEATURE_VERTICAL_MARGIN;

export const INVENTORY_HEIGHT = ANIMAL_VITALS_WINDOW_HEIGHT;

export const INVENTORY_WRAPPER_WIDTH = width * .98;

export const INVENTORY_CARET_WIDTH = width * .08;

export const INVENTORY_LIST_WIDTH = INVENTORY_WRAPPER_WIDTH * .8;

export const INVENTORY_ITEM_WIDTH = INVENTORY_LIST_WIDTH * .3;

export const INVENTORY_ITEM_MARGIN = INVENTORY_LIST_WIDTH / 60;


//Animal Info Page
export const ANIMAL_INFO_WINDOW_WIDTH = width * .98;

export const ANIMAL_INFO_WINDOW_HEIGHT = (height - NAV_BAR_HEIGHT) * .85;

export const ANIMAL_PICTURE_WIDTH = ANIMAL_INFO_WINDOW_WIDTH / 3;

export const ANIMAL_PICTURE_MARGIN = ANIMAL_PICTURE_WIDTH / 4;

export const ANIMAL_BIO_WIDTH = ANIMAL_INFO_WINDOW_WIDTH / 12 * 5;


//Shop Page

export const SHOP_WINDOW_WIDTH = width * .98;

export const SIGN_TOP_MARGIN = height * .1;

export const SIGN_BOTTOM_MARGIN = height * .01;

export const SIGN_FOOTER_HEIGHT = height * .09;

export const SHOP_BACKGROUND_HEIGHT = height - NAV_BAR_HEIGHT - SIGN_TOP_MARGIN - SIGN_BOTTOM_MARGIN;

export const SIGN_HEIGHT = SHOP_BACKGROUND_HEIGHT * .3;

export const SHELF_HEIGHT = height * .03;

export const SHELF_DEPTH = SHELF_HEIGHT * 1;

export const SHELF_WIDTH = SHOP_WINDOW_WIDTH * .95;

export const SHELF_SPACING = height * .15;

export const SHELF_WINDOW_HEIGHT = SHOP_BACKGROUND_HEIGHT - SIGN_HEIGHT - SIGN_FOOTER_HEIGHT;

export const RECEIPT_HEADER_MARGIN_TOP = height * .2;

export const RECEIPT_HEADER_HEIGHT = height * .1;

export const SUMMARY_HEIGHT = height * .45;

export const SUMMARY_WIDTH = width * .9;

export const LINE_ITEM_HEIGHT = height * .05




