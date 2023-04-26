/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Shared toolbox for JS-Interpreter demos.
 */



export var toolboxJson = {
  "contents": [
    {
      "kind": "CATEGORY",
      "name": "Logic",
      "colour": "%{BKY_LOGIC_HUE}",
      "contents": [
        {
          "kind": "BLOCK",
          "type": "controls_if"
        },
        {
          "kind": "BLOCK",
          "type": "logic_compare"
        },
        {
          "kind": "BLOCK",
          "type": "logic_operation"
        },
        {
          "kind": "BLOCK",
          "type": "logic_negate"
        },
        {
          "kind": "BLOCK",
          "type": "logic_boolean"
        }
      ]
    },
    {
      "kind": "CATEGORY",
      "name": "Loops",
      "colour": "%{BKY_LOOPS_HUE}",
      "contents": [
        {
          "kind": "BLOCK",
          "type": "controls_repeat_ext",
          "inputs": {
            "TIMES": {
              "shadow": {
                "type": "math_number",
                "fields": {"NUM": 10}
              }
            }
          }
        },
        {
          "kind": "BLOCK",
          "type": "controls_whileUntil"
        }
      ]
    },
    {
      "kind": "CATEGORY",
      "name": "Math",
      "colour": "%{BKY_MATH_HUE}",
      "contents": [
        {
          "kind": "BLOCK",
          "type": "math_number"
        },
        {
          "kind": "BLOCK",
          "type": "math_arithmetic",
          "inputs": {
            "A": {
              "shadow": {
                "type": "math_number",
                "fields": {"NUM": 1}
              }
            },
            "B": {
              "shadow": {
                "type": "math_number",
                "fields": {"NUM": 1}
              }
            }
          }
        },
        {
          "kind": "BLOCK",
          "type": "math_single",
          "inputs": {
            "NUM": {
              "shadow": {
                "type": "math_number",
                "fields": {"NUM": 9}
              }
            }
          }
        }
      ]
    },
    {
      "kind": "CATEGORY",
      "name": "Text",
      "colour": "%{BKY_TEXTS_HUE}",
      "contents": [
        {
          "kind": "BLOCK",
          "type": "text"
        },
        {
          "kind": "BLOCK",
          "type": "text_length",
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "text",
                "fields": {"TEXT": "abc"}
              }
            }
          }
        },
        {
          "kind": "BLOCK",
          "type": "text_print",
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "fields": {"TEXT": "abc"}
              }
            }
          }
        },
        {
          "kind": "BLOCK",
          "type": "text_prompt_ext",
          "inputs": {
            "TEXT": {
              "shadow": {
                "type": "text",
                "fields": {"TEXT": "abc"}
              }
            }
          }
        }
      ]
    },
    {
      "kind": "SEP"
    },
    {
      "kind": "CATEGORY",
      "name": "Variables",
      "custom": "VARIABLE",
      "colour": "%{BKY_VARIABLES_HUE}",
    },
    {
      "kind": "CATEGORY",
      "name": "Functions",
      "custom": "PROCEDURE",
      "colour": "%{BKY_PROCEDURES_HUE}",
    },
    {
      "kind": "CATEGORY",
      "name": "Phaser",
      "colour": "%{BKY_LOOPS_HUE}",
      "contents": [
        {
          'kind': 'block',
          'type': 'controls_if',
        },
        {
          'kind': 'block',
          'type': 'logic_boolean',
        },
        {
          'kind': 'block',
          'type': 'move_player'
        },
        {
          'kind': 'block',
          'type': 'walked_around'
        },
        {
          'kind': 'block',
          'type': 'direction_blocked'
        },
        {
          'kind': 'block',
          'type': 'direction_clear'
        },
        {
          'kind': 'block',
          'type': 'object_sock'
        },
        {
          'kind': 'block',
          'type': 'scan_for_object'
        },
        {
          'kind': 'block',
          'type': 'bool_sighted'
        },
      ]
    },
  ]
};
