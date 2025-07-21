/**
 * Fish spawn patterns for different difficulty levels.
 * Patterns are multiline strings, where each character
 * indicates the type of fish ('G' for Green, 'R' for Red, '-' for empty).
 * TODO: Move to a JSON file for better organization.
 */

class FishAtlas {
    constructor() {
        this.easyPatterns = [
            `
----G-----
-----G----
`,
            `
--G-------
G---------
--G-------
G---------
--G-------
`,
            `
-----G----
------G---
-------G--
---------G
------G---
`,
            `
---G------
--------G-
-----G----
--G-------
------G---
---G------
-----G----
----G-----
`,
            `
--G-------
---G------
----G-----
-----G----
------G---
-------G--
`,
            `
-------G--
---R--G---
--R----G--
`,
            `
----R-----
-----R----
----R-----
-----R----
`,
            `
R-G------R
R---G----R
R-----G--R
R---G----R
`,
            `
----G-----
---R-G----
----G-----
---G------
`,
            `
-R-----R--
----G-----
--------G-
-----G----
-G--------
----G-----
`,
        ];

        this.mediumPatterns = [
            `
RRRRRGRRRR
----------
----------
RRRRGRRRRR
----------
----------
`,
            `
----------
--RGR-----
----R-----
----------
-----G----
------G---
`,
            `
---R--G---
----RG----
----------
---G--R---
----GR----
----------
`,
            `
----------
-R---R----
---R-----R
-------R--
-R--------
------R---
`,
            `
----------
--R-G-R---
-R---G--R-
R---G----R
-R---G--R-
--R-G-R---
`,
            `
R--------R
-R---G--R-
--R----R--
---R--R---
----G-----
-----G----
---R--R---
--R----R--
-R--G---R-
R--------R
`,
            `
----G-----
--------G-
-G--------
--------G-
-G--------
-----G----
`,
            `
----------
---RG-R---
---R-GR---
---RG-R---
---R-GR---
---RG-R---
----------
`,
            `
---R------
---G------
------R---
------G---
----G-----
`,
            `
----G-----
------R---
---R------
--G-------
-------R--
---R------
----G-----
`,
        ];

        this.hardPatterns = [
            `
----------
--RGR-----
---RGR----
----RGR---
----RGR---
---RGR----
----RGR---
---RGR----
----RGR---
`,
            `
R---------
RRRR-RRRRR
RRRRR-RRRR
RRRR-RRRRR
RRRRR-RRRR
----------
RRR-RRRRRR
----------
RRRRRRR-RR
`,
            `
----RGR---
---R--R---
--R--R----
-R--R-----
-R-R------
-RGR------
-R--R-----
--R--RR---
---R--R---
----R-R---
----R-R---
----RGR---
`,
            `
----G-----
G---------
------R---
---R------
---------G
----G-----
`,
            `
-R--R-R-R-
--R--R-R--
R--R--RR-R
-RR-R--R-R
-R-R--RR-R
`,
            `
----RG----
----GR----
----RG----
----GR----
----RG----
----GR----
`,
            `
RR-RRRRRRR
---------G
RRRRRRR-RR
G---------
RR-RRRRRRR
`,
            `
R-R-R-R-R-
-R-R-R-R-R
R-R-R-R-R-
-R-R-R-R-R
R-R-R-R-R-
-R-R-R-R-R
R-R-R-R-R-
-R-R-R-R-R
`,
            `
R-RGR-R-R-
-R-R-R-R-R
R-R-RGR-R-
-R-R-R-R-R
R-RGR-R-R-
-R-R-R-R-R
R-R-R-RGR-
-R-R-R-R-R
`,
            `
-----GG---
`,
        ];

        this.veryHardPatterns = [
            `
RRR-R-R-R-
-RRR-R-R-R
R-RRR-R-R-
-R-RRR-R-R
R-R-RRR-R-
-R-R-RRR-R
R-R-R-RRR-
-R-R-R-RRR
`,
            `
RRRRRRRRRG
GRRRRRRRRR
RRRRRRRRRG
GRRRRRRRRR`,
        ];
    }

    /**
     * Get all easy patterns.
     * @returns {string[]} Array of easy patterns.
     */
    getEasyPatterns() {
        return this.easyPatterns;
    }
    /**
     * Get all medium patterns.
     * @returns {string[]} Array of medium patterns.
     */
    getMediumPatterns() {
        return this.mediumPatterns;
    }
    /**
     * Get all hard patterns.
     * @returns {string[]} Array of hard patterns.
     */
    getHardPatterns() {
        return this.hardPatterns;
    }
    /**
     * Get all very hard patterns.
     * @returns {string[]} Array of very hard patterns.
     */
    getVeryHardPatterns() {
        return this.veryHardPatterns;
    }
}
