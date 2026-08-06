#!/usr/bin/env bash

set -euo pipefail

###############################################################################
# CONFIG
###############################################################################

SOURCE_MODULE="accounts"
TARGET_MODULE="registrations"

ENABLE_VIETNAMESE_REPLACE=false


###############################################################################
# HELPERS
###############################################################################

capitalize() {
    echo "${1^}"
}

uppercase() {
    echo "$1" | tr '[:lower:]' '[:upper:]'
}


###############################################################################
# NAME MAP
###############################################################################

SOURCE_SINGULAR="${SOURCE_MODULE%s}"
TARGET_SINGULAR="${TARGET_MODULE%s}"

SOURCE_PLURAL_CLASS="$(capitalize "$SOURCE_MODULE")"
TARGET_PLURAL_CLASS="$(capitalize "$TARGET_MODULE")"

SOURCE_CLASS="$(capitalize "$SOURCE_SINGULAR")"
TARGET_CLASS="$(capitalize "$TARGET_SINGULAR")"

SOURCE_UPPER="$(uppercase "$SOURCE_MODULE")"
TARGET_UPPER="$(uppercase "$TARGET_MODULE")"

SOURCE_SINGULAR_UPPER="$(uppercase "$SOURCE_SINGULAR")"
TARGET_SINGULAR_UPPER="$(uppercase "$TARGET_SINGULAR")"


echo "$SOURCE_MODULE -> $TARGET_MODULE"


###############################################################################
# COPY
###############################################################################

rm -rf "$TARGET_MODULE"
cp -r "$SOURCE_MODULE" "$TARGET_MODULE"


###############################################################################
# RENAME PATH
###############################################################################

echo "Rename files..."

find "$TARGET_MODULE" -depth | while read -r path; do

    new="$path"

    new="${new//$SOURCE_SINGULAR_UPPER/$TARGET_SINGULAR_UPPER}"
    new="${new//$SOURCE_UPPER/$TARGET_UPPER}"

    new="${new//$SOURCE_PLURAL_CLASS/$TARGET_PLURAL_CLASS}"
    new="${new//$SOURCE_CLASS/$TARGET_CLASS}"

    new="${new//$SOURCE_MODULE/$TARGET_MODULE}"
    new="${new//$SOURCE_SINGULAR/$TARGET_SINGULAR}"


    if [[ "$new" != "$path" ]]; then
        mv "$path" "$new"
    fi

done


###############################################################################
# REPLACE CONTENT
###############################################################################

echo "Replace content..."

find "$TARGET_MODULE" \
    \( \
        -name "*.js" \
        -o -name "*.jsx" \
        -o -name "*.ts" \
        -o -name "*.tsx" \
    \) \
    -type f \
    -exec perl -pi -e "

        s/${SOURCE_SINGULAR_UPPER}/${TARGET_SINGULAR_UPPER}/g;
        s/${SOURCE_UPPER}/${TARGET_UPPER}/g;

        s/${SOURCE_PLURAL_CLASS}/${TARGET_PLURAL_CLASS}/g;
        s/${SOURCE_CLASS}/${TARGET_CLASS}/g;

        s/${SOURCE_MODULE}/${TARGET_MODULE}/g;
        s/${SOURCE_SINGULAR}/${TARGET_SINGULAR}/g;

    " {} +


###############################################################################
# OPTIONAL VIETNAMESE
###############################################################################

if [[ "$ENABLE_VIETNAMESE_REPLACE" == true ]]; then

    find "$TARGET_MODULE" \
        \( \
            -name "*.js" \
            -o -name "*.jsx" \
            -o -name "*.ts" \
            -o -name "*.tsx" \
        \) \
        -type f \
        -exec sed -i \
        -e "s/tài khoản/$TARGET_SINGULAR/g" \
        -e "s/Tài khoản/$(capitalize "$TARGET_SINGULAR")/g" \
        {} +

fi


###############################################################################
# VERIFY
###############################################################################

echo ""
echo "Checking..."

for word in \
    "$SOURCE_SINGULAR" \
    "$SOURCE_MODULE" \
    "$SOURCE_CLASS" \
    "$SOURCE_PLURAL_CLASS" \
    "$SOURCE_UPPER"
do
    if grep -Rni "$word" "$TARGET_MODULE" >/dev/null 2>&1; then
        echo "Remaining: $word"
    fi
done


echo ""
echo "Done."