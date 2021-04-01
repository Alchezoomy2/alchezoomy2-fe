import React from "react";

export default function Instructions() {
    return (
        <div>
            <h3>Installation</h3>
            <ul>
                <li>Navigate to <a href={"https://alchemylectures.com/teacher/login"}>https://alchemylectures.com/teacher/login</a>
                </li>
                <li>
                    {"Click on \"Sign In With Zoom\" button."}
                </li>
                <li>
                    Sign in through your Zoom account.
                </li>
                <li>
                    {"Verify you Zoom user data and press \"create user\" button."}
                </li>
            </ul>
            <h3>Usage</h3>
            <h5>Manage Meetings:</h5>
            <ul>
                <li>
                    You will see a list of your recorded lectures
                </li>
                <ul>
                    <li>
                        Each Listing will indicate whether video, audio, chat and transcripts are available.
                        </li>
                </ul>
                <li>
                    {"If you wish to share this lecture with your students, click on the “publish” slider."}
                    <ul>
                        <li>
                            Publishing your lecture will download any video, chat and transcript data to our server.
                        </li>
                        <li>
                            Published lectures will be accessible to the students that you invite
                        </li>
                        <li>
                            Unpublishing your lecture will delete all video, chat and transcript data from our server.
                        </li>
                    </ul>
                </li>
            </ul>
            <h5>Manage Students:</h5>
            <ul>
                <li>
                    {"To invite your students click on “Subscriptions” in the header."}
                </li>
                <li>
                    {"Enter the student email into the “Invite Student” input box."}
                    <ul>
                        <li>
                            Be sure that the email address given is the same as they use for their Zoom account.
                        </li>
                        <li>
                            Push submit button.
                        </li>
                    </ul>
                    <ul>
                        <li>
                            An email be sent to that student, inviting them to create an account
                        </li>
                        <li>
                            All of your current subscribed students will appear under “subscriptions”
                            <ul>
                                <li>
                                    To remove a student’s access from your account click on the delete button next to their listing
                                </li>
                                <li>
                                    If you reinvite that student their saved bookmarks and comments will be available to them.
                                </li>
                            </ul>
                        </li>

                    </ul>
                </li>
            </ul>
            <h3>Uninstallation:</h3>
            <ul>
                <li>
                    Login to you Zoom Account and navigate to the Zoom App Marketplace.
                </li>
                <li>
                    Click Manage > Installed Apps or search for the Alchemy Lectures app.
                </li>
                <li>
                    Click the Alchemy Lectures app
                </li>
                <li>
                    Click Uninstall
                </li>
            </ul>

        </div>
    );
}