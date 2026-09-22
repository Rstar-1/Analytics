import headerData from "../data/header.json";
import footer from "../data/footer.json";
import cmsData from "../data/cms.json";
import rawConfigData from "../data/config.json";

const isEcom = import.meta.env.VITE_ECOM === 'true';

const header = {
    ...headerData,
    navLinks: headerData.navLinks?.filter(item => item.ecomOnly === undefined || item.ecomOnly === isEcom)
};

const configData = {
    ...rawConfigData,
    Header: Array.isArray(rawConfigData.Header)
        ? Object.assign([...rawConfigData.Header], rawConfigData.Header[0], {
            HeaderSticky: rawConfigData.Header[0]?.HeaderSticky
        })
        : rawConfigData.Header,
    HeaderSticky: rawConfigData.Header?.[0]?.HeaderSticky ?? rawConfigData.HeaderSticky ?? false,
    Footer: Array.isArray(rawConfigData.Footer)
        ? Object.assign([...rawConfigData.Footer], rawConfigData.Footer[0], {
            FooterVersion: rawConfigData.Footer[0]?.FooterVersion,
            FooterSocial: rawConfigData.Footer[0]?.FooterSocial,
            FooterTopBar: rawConfigData.Footer[0]?.FooterTopBar,
            FooterBottomBar: rawConfigData.Footer[0]?.FooterBottomBar
        })
        : rawConfigData.Footer
};

export const {
    HeroSections: heroCMS,
    AboutSections: aboutCMS,
    ServiceSection: serviceCMS,
    FeedSection: feedCMS,
    BlogSection: blogCMS,
    PatchSection: patchCMS,
} = cmsData;

export { header, footer, footer as footerData, cmsData, configData };
