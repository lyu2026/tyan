#!/bin/bash

# 从下载的 keystore-config.json 读取配置
if [ ! -f "keystore-config.json" ]; then
    echo "错误：找不到 keystore-config.json 文件"
    exit 1
fi

# 读取配置
ALIAS=$(jq -r '.alias' keystore-config.json)
STORE_PASS=$(jq -r '.store_password' keystore-config.json)
KEY_PASS=$(jq -r '.key_password' keystore-config.json)

# 生成 Base64
KEYSTORE_BASE64=$(base64 -w 0 app-release.keystore)

# 显示需要设置的 Secrets
echo "请将以下内容添加到 GitHub Secrets (Settings -> Secrets and variables -> Actions)："
echo ""
echo "1. KEYSTORE_BASE64:"
echo "$KEYSTORE_BASE64"
echo ""
echo "2. KEYSTORE_PASSWORD:"
echo "$STORE_PASS"
echo ""
echo "3. KEY_ALIAS:"
echo "$ALIAS"
echo ""
echo "4. KEY_PASSWORD:"
echo "$KEY_PASS"
echo ""
echo "或者运行以下命令自动设置（需要 GitHub CLI）："
echo ""
echo "gh secret set KEYSTORE_BASE64 -b\"$KEYSTORE_BASE64\""
echo "gh secret set KEYSTORE_PASSWORD -b\"$STORE_PASS\""
echo "gh secret set KEY_ALIAS -b\"$ALIAS\""
echo "gh secret set KEY_PASSWORD -b\"$KEY_PASS\""