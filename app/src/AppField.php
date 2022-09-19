<?php

namespace L51\Sandbox;

use SilverStripe\Forms\LiteralField;
use SilverStripe\View\Requirements;

class AppField extends LiteralField
{
    public function __construct($fieldName, $appName, $payload = [])
    {
        Requirements::css('app/client/dist/style.css');
        Requirements::javascript("app/client/dist/$appName.js");

        parent::__construct(
            $fieldName,
            "<div
                id='AppField_$fieldName'
                class='app-field $appName'
                data-payload='" . json_encode($payload) . "'></div>"
        );
    }
}
