# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Generate an original synthetic drawing and confirmed input, using only stdlib."""
import argparse
import json
from pathlib import Path


def draft():
    return {'scale':{'points':[[.1,.1],[.2,.1]],'metres':20},'buildings':[
        {'code':'A','height':12,'method':'traced','outline':[[.1,.2],[.4,.2],[.4,.6],[.1,.6]],
         'program':{'floors':3,'floor_height_m':3,'use':'office'}},
        {'code':'B','height':9,'method':'traced','outline':[[.6,.3],[.85,.3],[.85,.65],[.6,.65]],
         'program':{'floors':2,'floor_height_m':3,'use':'workshop'}}],
        'site':{'boundary':[[.05,.1],[.95,.1],[.95,.9],[.05,.9]],'reference':'Original synthetic example boundary'}}


def pdf_bytes():
    # A 200 x 100 pt sheet; calibrated 1 PDF point = 1 metre.
    stream = b'''0.5 w 0.5 G 10 10 180 80 re S
0.1 0.3 0.7 RG 20 40 60 40 re S 120 35 50 35 re S
0 G 20 90 m 40 90 l S
BT /F1 4 Tf 22 93 Td (20 m ruler) Tj ET
BT /F1 4 Tf 23 72 Td (A: 12 m high, 3 floors x 3 m) Tj ET
BT /F1 4 Tf 122 63 Td (B: 9 m high) Tj ET
BT /F1 4 Tf 122 57 Td (2 floors x 3 m) Tj ET
BT /F1 3 Tf 12 4 Td (SYNTHETIC EXAMPLE - NOT A REAL PLANNING DOCUMENT) Tj ET
'''
    objects = [b'<< /Type /Catalog /Pages 2 0 R >>',
        b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 100] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
        b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
        b'<< /Length '+str(len(stream)).encode()+b' >>\nstream\n'+stream+b'endstream']
    content = bytearray(b'%PDF-1.4\n')
    offsets = [0]
    for index, obj in enumerate(objects,1):
        offsets.append(len(content))
        content.extend(f'{index} 0 obj\n'.encode()+obj+b'\nendobj\n')
    xref = len(content)
    content.extend(b'xref\n0 6\n0000000000 65535 f \n')
    for offset in offsets[1:]: content.extend(f'{offset:010d} 00000 n \n'.encode())
    content.extend(f'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode())
    return bytes(content)


def generate(output):
    # Exclusive directory creation prevents accidental overwrite of user files.
    output = output.resolve()
    output.mkdir(parents=True,exist_ok=False)
    model = draft()
    drawing = output/'siteform-example.pdf'
    drawing.write_bytes(pdf_bytes())
    (output/'confirmed-draft.json').write_text(json.dumps(model,indent=2)+'\n',encoding='utf-8')
    prompt = f'''This is an original synthetic SiteForm example, not a real planning project.
I confirm the scale, outlines, parcel, heights and floor programs in the JSON below.
Import the local PDF at {drawing} using siteform_import_pdf.
Use siteform_create for page 1 of the returned document ID with this exact draft.
Do not infer, substitute or round the confirmed inputs. Show the created interactive
3D model in this conversation. If this working model already exists, open it instead
of overwriting it. State that this is synthetic concept data.

{json.dumps(model,indent=2)}
'''
    (output/'chat-prompt.txt').write_text(prompt,encoding='utf-8')
    return output


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-dir',type=Path,required=True,help='A new directory; existing directories are refused.')
    print(generate(parser.parse_args().output_dir))
