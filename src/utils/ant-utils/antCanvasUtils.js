export const recursiveDraw = (files, index, ctx) => {
    const image = new Image(164, 164)
    image.src = files[index]
    image.onload = () => {
        ctx.drawImage(image, 0, 0)
        if (index + 1 < files.length) {
            recursiveDraw(files, index + 1, ctx)
        }
    }
}

export const baseElements = [
    'ant/base/6-ant-right-foreleg.png',
    'ant/base/3-ant-head.png',
    'ant/base/5-ant-thorax.png',
    'ant/base/8-ant-abdomen.png',
    'ant/base/1-ant-eyes.png', 
    'ant/base/2-ant-mandibles.png', 
    'ant/base/4-dog-tags.png',
    'ant/base/7-holster.png'
]