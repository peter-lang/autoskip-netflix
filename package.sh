#!/usr/bin/env bash

ORIG_PWD="`pwd`"
DIR_NAME="AutoSkip"
FINAL_NAME="$DIR_NAME.zip"
PROJ_DIR="`dirname \"$0\"`"

if [ -f "$PROJ_DIR/$FINAL_NAME" ]; then
    echo "Found previous $FINAL_NAME"
    rm -f "$PROJ_DIR/$FINAL_NAME"
    echo "Deleting previous $FINAL_NAME"
fi

echo "Creating $FINAL_NAME"
cd "$PROJ_DIR"
zip -r "$FINAL_NAME" "$DIR_NAME" -x \*.DS_Store
cd "$ORIG_PWD"

echo "Finished $FINAL_NAME"
