const MonkeyForm = () => {
    return (
        <div 
            id="mc_embed_signup"
            style={{
                background: '#fff',
                clear: 'left',
                font: '14px Helvetica,Arial,sans-serif',
                width: '600px'
            }}
            dangerouslySetInnerHTML={{
                __html: `
                    <form action="https://mindfulmeasuresinc.us21.list-manage.com/subscribe/post?u=51c8d9860074f1c7205c2f452&id=3e97664d88&f_id=00ed42e6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
                        <div id="mc_embed_signup_scroll">
                            <h2>Schedule a Demo</h2>
                            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
                            <div class="mc-field-group">
                                <label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label>
                                <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required value="">
                            </div>
                            <div class="mc-field-group">
                                <label for="mce-FNAME">Organization Name <span class="asterisk">*</span></label>
                                <input type="text" name="FNAME" class="required text" id="mce-FNAME" required value="">
                                <span id="mce-FNAME-HELPERTEXT" class="helper_text">Full business or organization name</span>
                            </div>
                            <div class="mc-field-group">
                                <label for="mce-LNAME">Full Name and Role <span class="asterisk">*</span></label>
                                <input type="text" name="LNAME" class="required text" id="mce-LNAME" required value="">
                            </div>
                            <div id="mce-responses" class="clear">
                                <div class="response" id="mce-error-response" style="display: none;"></div>
                                <div class="response" id="mce-success-response" style="display: none;"></div>
                            </div>
                            <div aria-hidden="true" style="position: absolute; left: -5000px;">
                                <input type="text" name="b_51c8d9860074f1c7205c2f452_3e97664d88" tabindex="-1" value="">
                            </div>
                            <div class="clear">
                                <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
                            </div>
                        </div>
                    </form>
                `
            }}
        />
    );
};

export default MonkeyForm;