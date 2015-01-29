<?php

class SlugHelper
{

    /**
     * Create slug from text. Also translit cirylic text.
     * @param string $text Text to create slug
     * @return string Slug
     */
    public static function run($text)
    {
        $matrix=array(
            "й"=>"i","ц"=>"c","у"=>"u","к"=>"k","е"=>"e","н"=>"n",
            "г"=>"g","ш"=>"sh","щ"=>"sh","з"=>"z","х"=>"h","ъ"=>"\'",
            "ф"=>"f","ы"=>"i","в"=>"v","а"=>"a","п"=>"p","р"=>"r",
            "о"=>"o","л"=>"l","д"=>"d","ж"=>"zh","э"=>"ie","ё"=>"e",
            "я"=>"ya","ч"=>"ch","с"=>"s","м"=>"m","и"=>"i","т"=>"t",
            "ь"=>"\'","б"=>"b","ю"=>"yu","і"=>"i","ї"=>"i",

            "Й"=>"I","Ц"=>"C","У"=>"U","К"=>"K","Е"=>"E","Н"=>"N",
            "Г"=>"G","Ш"=>"SH","Щ"=>"SH","З"=>"Z","Х"=>"X","Ъ"=>"\'",
            "Ф"=>"F","Ы"=>"I","В"=>"V","А"=>"A","П"=>"P","Р"=>"R",
            "О"=>"O","Л"=>"L","Д"=>"D","Ж"=>"ZH","Э"=>"IE","Ё"=>"E",
            "Я"=>"YA","Ч"=>"CH","С"=>"S","М"=>"M","И"=>"I","Т"=>"T",
            "Ь"=>"\'","Б"=>"B","Ю"=>"YU","І"=>"I","Ї"=>"I",

            "a"=>"a", "ą"=>"a", "b"=>"b", "c"=>"c", "ć"=>"c", "d"=>"d",
            "e"=>"e", "ę"=>"e", "f"=>"f", "g"=>"g", "h"=>"h", "i"=>"i",
            "j"=>"j", "k"=>"k", "l"=>"l", "ł"=>"l", "m"=>"m", "n"=>"n",
            "ń"=>"n", "o"=>"o", "ó"=>"o", "p"=>"p", "r"=>"r", "s"=>"s",
            "ś"=>"s", "t"=>"t", "u"=>"u", "w"=>"W", "y"=>"Y", "z"=>"z",
            "ź"=>"Z", "ż"=>"z",

            "A"=>"A", "Ą"=>"a", "B"=>"B", "C"=>"C", "Ć"=>"C", "D"=>"D",
            "E"=>"E", "Ę"=>"E", "F"=>"F", "G"=>"G", "H"=>"H", "I"=>"I",
            "J"=>"J", "K"=>"K", "L"=>"L", "Ł"=>"L", "M"=>"M", "N"=>"N",
            "Ń"=>"N", "O"=>"O", "Ó"=>"O", "P"=>"P", "R"=>"R", "S"=>"S",
            "Ś"=>"S", "T"=>"T", "U"=>"U", "W"=>"W", "Y"=>"Y", "Z"=>"Z",
            "Ź"=>"Z", "Ż"=>"Z",

            "«"=>"","»"=>""," "=>"-",
        );
        foreach($matrix as $from=>$to)
            $text=mb_eregi_replace($from,$to,$text);
        $text = preg_replace('/[^A-Za-z0-9_\-]/', '', $text);

        return trim(strtolower($text));
    }

}
