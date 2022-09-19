<?php

namespace {

    use L51\Sandbox\AppField;
    use SilverStripe\CMS\Model\SiteTree;
    use SilverStripe\Core\Environment;

    class Page extends SiteTree
    {
        private static $db = [];

        private static $has_one = [];

        public function getCMSFields()
        {
            $fields = parent::getCMSFields();

            $fields->addFieldToTab(
                'Root.Main',
                AppField::create(
                    'DemoGifField',
                    'gif-field', // <--- will be used as css class selector and has to match first param of watchElement()
                    [
                        'apiKey' => Environment::getEnv('TENOR_API_KEY'),
                        'topic'  => 'nerds'
                    ]
                ),
                'Title'
            );

            return $fields;
        }
    }
}
