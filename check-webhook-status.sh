#!/bin/bash
# Quick webhook status check
cd /root/.openclaw/workspace/mlm-lead-crm
echo "=== Skooly Webhook Status ==="
node final-check.js
echo ""
echo "Looking for drifllc email specifically:"
node check-for-drifllc.js
